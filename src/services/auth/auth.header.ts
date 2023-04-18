export const authHeader = () => {
  // return authorization header with jwt token
  let auth = JSON.parse((localStorage as any).getItem('auth'));
  return { 'user-token': auth?.auth.token };
};
