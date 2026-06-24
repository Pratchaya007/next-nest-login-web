import { serverEnv } from "@/config/server.env";
import { ApiError } from "./api.error";

// 1. Costom Method
type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

// 2. BACKEND_URL INPORT IN ENV IN SERVER
const BACKEND_URL = serverEnv.BACKEND_URL;

// 3. Creat function Fetch
const apiFetch = async <T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> => {
  // 3.1 ดึงข้อมูลมาใช้งานแบบ de
  const { method = "GET", body } = options;

  // 3.2 ถ้ามี body and body not formdata ให้ใส่ ['Content-type'] = 'application/json'
  const headers: Record<string, string> = {};
  if (body && !(body instanceof FormData))
    //ถ้าใน body in data? and not FormData ใฟ้ใส่ ['Content-type'] = 'application/json'
    headers["Content-type"] = "application/json";

  // 3.3 ถ้าbody เป็น instanceof formaData return body not FormaData Change JSON.stringify
  const config: RequestInit = {
    method,
    body: body
      ? body instanceof FormData //FormData คือรูปแบบของไฟล์ fetch มันออโต้ให้อยู่แล้ว
        ? body
        : JSON.stringify(body)
      : undefined,
    headers,
  };

  //fetch("/api/users", {method: "POST",body: JSON.stringify({}),headers: {"Content-Type": "application/json",},});
  const res = await fetch(`${BACKEND_URL}${url}`, config);

  if (!res.ok) {
    const error = await res.json();
    throw new ApiError(error.message, error.code, error.details);
  }

  return (await res.json()).data;
};

// Costom Api
const get = <T>(url: string) => apiFetch<T>(url);
const post = <T>(url: string, body?: unknown) =>
  apiFetch<T>(url, { method: "POST", body });
const put = <T>(url: string, body?: unknown) =>
  apiFetch<T>(url, { method: "PUT", body });
const patch = <T>(url: string, body?: unknown) =>
  apiFetch<T>(url, { method: "PATCH", body });
const del = <T>(url: string) => apiFetch<T>(url, { method: "DELETE" });

export const api = { get, patch, post, put, delete: del };
