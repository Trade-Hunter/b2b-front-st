import axios from 'axios';
import TokenService from './token.service';

class AuthService {
  Login(LoginInput: any) {
    return new Promise((resolve, reject) => {
      axios.post(import.meta.env.VITE_AUTH_HOST + `/users/login`, LoginInput).then(
        (response: any) => {
          resolve(response.data);
        },
        (error: any) => {
          reject(error.response.data);
        },
      );
    });
  }
  Refresh(refreshToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.post(`${import.meta.env.VITE_AUTH_HOST}/users/refresh`, { refreshToken }).then(
        (response: any) => {
          resolve(response.data);
        },
        (error: any) => {
          reject(error.response.data);
        },
      );
    });
  }
  Logout() {
    TokenService.removeUser();
  }
  SmartLogin(SmartLoginInput: any) {
    return new Promise((resolve, reject) => {
      axios.post(import.meta.env.VITE_AUTH_HOST + `/users/smart`, SmartLoginInput).then(
        (response: any) => {
          resolve(response.data);
        },
        (error: any) => {
          reject(error.response.data);
        },
      );
    });
  }
  Register(RegisterInput: any) {
    return new Promise((resolve, reject) => {
      axios.post(import.meta.env.VITE_AUTH_HOST + `/users/register`, RegisterInput).then(
        (response: any) => {
          resolve(response.data);
        },
        (error: any) => {
          reject(error.response.data);
        },
      );
    });
  }
  checkout(loginInput: any) {
    return axios(import.meta.env.VITE_AUTH_HOST + `/users/smart`, {
      method: 'POST',
      data: loginInput,
    }).then(
      async (response: any) => {
        return response.data;
      },
      (error: any) => {
        throw error.response.data;
      },
    );
  }
  ResetPassword(user: any) {
    return;
  }
  VerifyEmail(email: any) {
    return new Promise((resolve, reject) => {
      axios.post(import.meta.env.VITE_AUTH_HOST + `/users/email`, { email }).then(
        (response: any) => {
          resolve(response.data);
        },
        (error: any) => {
          reject(error.response.data);
        },
      );
    });
  }
  VerifyDocument(document: any) {
    return new Promise((resolve, reject) => {
      axios.post(import.meta.env.VITE_AUTH_HOST + `/users/document`, { document }).then(
        (response: any) => {
          resolve(response.data);
        },
        (error: any) => {
          reject(error.response.data);
        },
      );
    });
  }
  refreshToken(refreshToken: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(import.meta.env.VITE_AUTH_HOST + `/users/refresh`, {
          refreshToken,
        })
        .then(
          ({ data }: any): any => {
            resolve(data);
          },
          (error: any) => {
            reject();
          },
        );
    });
  }
}

export default new AuthService();
