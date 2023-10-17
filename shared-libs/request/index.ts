import Axios from 'axios';

/** axios实例 */
export const axiosInstance = Axios.create({ withCredentials: import.meta.env.DEV });

/** api前缀 */
export const ApiPath = import.meta.env.VITE_API_BASE_PATH ? import.meta.env.VITE_API_BASE_PATH : '/spi';
