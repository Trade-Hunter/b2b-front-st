class TokenService {
  getLocalRefreshToken() {
    const auth = JSON.parse((localStorage as any).getItem('auth'));
    return auth?.auth.refreshToken;
  }

  getLocalAccessToken() {
    const auth = JSON.parse((localStorage as any).getItem('auth'));
    return auth?.auth.token;
  }

  updateLocalAccessToken(token: any) {
    let user = JSON.parse((localStorage as any).getItem('user'));
    user.accessToken = token;
    (localStorage as any).setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse((localStorage as any).getItem('user'));
  }

  setUser(user: any) {
    console.log(JSON.stringify(user));
    (localStorage as any).setItem('user', JSON.stringify(user));
  }

  removeUser() {
    (localStorage as any).removeItem('user');
  }
}

export default new TokenService();
