import axios from "axios";

export const getAuthToken = async (email: string, password: string) => {
  try {
    const response = await axios.post("https://localhost:7252/apiUser/login", {
      email,
      password,
    });

    if (!response.data.token) {
      throw new Error("Authentication failed");
    }

    return response.data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};
