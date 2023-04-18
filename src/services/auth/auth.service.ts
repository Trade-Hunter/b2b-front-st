import axios from "axios";

class AuthService {
  login(loginInput: any) {
    return axios(`http://192.168.1.18:3001/login`, {
      method: "POST",
      data: loginInput,
    }).then(
      async (response: any) => {
        return response.data;
      },
      (error) => {
        throw error.response.data;
      }
    );
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(loginInput: any) {
    return axios(`http://192.168.1.18:3001/register`, {
      method: "POST",
      data: loginInput,
    }).then(
      async (response: any) => {
        return response.data;
      },
      (error) => {
        throw error.response.data;
      }
    );
  }
  checkout(loginInput: any) {
    return axios(`http://192.168.1.18:3001/smart`, {
      method: "POST",
      data: loginInput,
    }).then(
      async (response: any) => {
        return response.data;
      },
      (error) => {
        throw error.response.data;
      }
    );
  }

  resetPassword(user: any) {
    return;
  }

  confirmEmail(user: any) {}
}

export default new AuthService();
