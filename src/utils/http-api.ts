import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const i = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
i.interceptors.request.use(async (request) => {
  const session: any = await getSession();
  console.log({session})
  if (session) {
    request.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return request;
});

export async function get(url: string) {
  const res = await i.get(url);

  return res;
}

export async function post<T>(url: string, data?: T, config?: AxiosRequestConfig<any>) {
  const res = await i.post<T>(url, data, {
    headers: {
      ...config?.headers,
    },
    ...config,
  });
  return res;
}

export async function postAnonymous<T>(url: string, data?: T) {
  const iAnon = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 3000,
  });
  const res = await iAnon.post(url, data);
  return res;
}

export async function postForm<T>(url: string, data?: any) {
  const res = await i.post<T>(url, data, {
    headers: {
      ...data.getHeaders(),
      'Content-Type': 'multipart/form-data',
    }
  });
  return res;
}

export async function patch(url: string, data?: any) {
  const res = await i.patch(url, data);

  return res;
}

export async function put(url: string, data?: any) {
  const res = await i.put(url, data);

  return res;
}

export async function del(url: string, data?: any) {
  const res = await i.delete(url, { data });

  return res;
}
