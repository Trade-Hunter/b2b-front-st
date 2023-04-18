import axiosInstance from './api';
import TokenService from './token.service';

const setup = (store: any) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers['user-token'] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== '/login' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await axiosInstance.post(`${import.meta.env.VITE_AUTH_HOST}/users/refresh`, {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const token = rs.data;
            console.log('setup inteceptor', token);
            store.dispatch('auth/refreshToken', token);
            originalConfig.headers['user-token'] = token;
            return axiosInstance(originalConfig);
          } catch (_error) {
            store.dispatch('auth/sessionExpired');
            return Promise.reject(_error);
          }
        } else if (err.response.status === 403) {
          //console.log('deu status 403');
          store.dispatch('auth/sessionExpired');
        }
      }

      return Promise.reject(err);
    },
  );
};

export default setup;
