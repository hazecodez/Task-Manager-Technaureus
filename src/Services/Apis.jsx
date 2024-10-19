import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://82.180.145.66:8000/api/v1",
});

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
