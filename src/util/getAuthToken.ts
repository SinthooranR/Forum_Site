import apiUrl from "@/getApiPath";
import axios from "axios";
import { parseCookies } from "nookies";

export const getAuthToken = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${apiUrl}/apiUser/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":
            "https://forum-site-sinthooranr.vercel.app",
        },
      }
    );

    const cookies = parseCookies({}, response.headers["Set-Cookie"] || "");

    console.log("Cookies:", parseCookies());
    const token = cookies.token;

    if (!token) {
      throw new Error("Authentication failed");
    }

    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    throw error;
  }
};
