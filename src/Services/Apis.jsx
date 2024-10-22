import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url !== `/register/` && config.url !== "/login/") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const response = await axiosInstance.post("/token/refresh/", {
            refresh: refreshToken,
          });

          const newAccessToken = response.data.access;
          localStorage.setItem("token", newAccessToken);
          localStorage.setItem("refresh", response.data.refresh);

          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error("Refresh token error: ", refreshError);
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export async function userLogin(formdata) {
  try {
    const response = await axiosInstance.post("/login/", formdata);
    return response;
  } catch (error) {
    console.log("Error login user : ", error);
  }
}

export async function userRegister(formdata) {
  try {
    const response = await axiosInstance.post("/register/", formdata);
    return response;
  } catch (error) {
    console.log("Error user signup : ", error);
  }
}

export async function userProfile() {
  try {
    const response = await axiosInstance.get("/profile");
    return response;
  } catch (error) {
    console.log("Error fetching user profile : ", error);
  }
}

export async function userTasks() {
  try {
    const response = await axiosInstance.get("/tasks/");
    return response;
  } catch (error) {
    console.log("Error fetching tasks list : ", error);
  }
}

export async function userCreateTask(data) {
  try {
    const response = await axiosInstance.post("/tasks/", data);
    return response;
  } catch (error) {
    console.log("Error creating new task : ", error);
  }
}

export async function userTaskDetails(taskId) {
  try {
    const response = await axiosInstance.get(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    console.log("Error fetching task details : ", error);
  }
}

export async function userUpdateTask(data, taskId) {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}/`, data);
    return response;
  } catch (error) {
    console.log("Error updating task : ", error);
  }
}

export async function userDeleteTask(taskId) {
  try {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    console.log("Error deleting task : ", error);
  }
}

export async function statusFilter(task_status) {
  try {
    const response = await axiosInstance.get(`/tasks/status/${task_status}`);
    return response;
  } catch (error) {
    console.log("Error filtering tasks : ", error);
  }
}

export async function userLogout(refresh) {
  try {
    const response = await axiosInstance.post("/logout/", { refresh });
    return response;
  } catch (error) {
    console.log("Error logout user : ", error);
  }
}
