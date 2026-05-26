import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use(
  request => {
    request.headers['interviewerName'] = '楊晴卉';

    return request;
  },
  error => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    return Promise.reject(error);
  },
);

export const apiSignup = (data: {
  name: string;
  email: string;
  roleLevel: string;
  status: string;
}) => authApi.post(`/create-account`, data);

export const apiLogin = (data: { email: string; password: string }) =>
  authApi.get(`/accounts`, { params: data });
