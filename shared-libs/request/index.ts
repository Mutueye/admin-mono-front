import Axios from 'axios';

/** axios实例，默认5分钟超时 */
export const axiosInstance = Axios.create({ withCredentials: import.meta.env.DEV, timeout: 300000 });

/** api前缀 */
export const ApiPath = import.meta.env.VITE_API_BASE_PATH ? import.meta.env.VITE_API_BASE_PATH : '/spi';
