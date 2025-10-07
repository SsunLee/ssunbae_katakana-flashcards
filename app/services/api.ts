// app/services/api.ts
import axios from "axios";
import type { AxiosError } from "axios"; 
import type { Verb } from "@/app/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://YOUR_API_ENDPOINT";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
});

export async function fetchVerbs(): Promise<Verb[]> {
  try {
    const { data } = await apiClient.get<Verb[]>("/verbs");
    return data ?? [];
  } catch (err) {
    const e = err as AxiosError<any>;

    console.error("Failed to fetch verbs with axios:", e.message);

    if (e.response) {
      console.error("Status:", e.response.status);
      console.error("Response data:", e.response.data);
    } else if (e.request) {
      console.error("No response received (network/timeout).");
    }

    return [];
  }
}