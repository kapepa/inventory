import { axiosClient } from "./client";
import { axiosServer } from "./server";

export const axiosInstance = typeof window === "undefined" ? axiosServer : axiosClient