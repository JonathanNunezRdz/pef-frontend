import { BASE_URL } from '@/utils';
import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
	baseURL: `${BASE_URL}/api`,
};

const api = axios.create(axiosConfig);

export default api;
