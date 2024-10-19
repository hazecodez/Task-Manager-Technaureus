import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://82.180.145.66:8000/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config && config.url) {
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

export async function userLogin(formdata) {
  try {
    const response = await axiosInstance.post("/login", formdata);
    return response;
  } catch (error) {
    console.log("Error login user : ", error);
  }
}

export async function userRegister(formdata) {
  try {
    const response = await axiosInstance.post(" /register", formdata);
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
    const response = await axiosInstance.get("/tasks");
    return response;
  } catch (error) {
    console.log("Error fetching tasks list : ", error);
  }
}

export async function createTask(data) {
  try {
    const response = await axiosInstance.post("/tasks", data);
    return response;
  } catch (error) {
    console.log("Error creating new task : ", error);
  }
}

export async function taskDetails(taskId) {
  try {
    const response = await axiosInstance.get(`/tasks/${taskId}`);
    return response;
  } catch (error) {
    console.log("Error fetching task details : ", error);
  }
}

export async function updateTask(data, taskId) {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}`, data);
    return response;
  } catch (error) {
    console.log("Error updating task : ", error);
  }
}

export async function deleteTask(taskId) {
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
    const response = await axiosInstance.post("/logout", refresh);
    return response;
  } catch (error) {
    console.log("Error logout user : ", error);
  }
}

export async function refreshToken(refresh) {
  try {
    await axiosInstance.post("/token/refresh", refresh);
  } catch (error) {
    console.log("Error refreshing token : ", error);
  }
}
