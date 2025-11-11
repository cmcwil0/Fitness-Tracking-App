export const getToken = () => localStorage.getItem('token');
export const isLoggedIn = () => !!getToken();
export const authHeaders = () => {
  const t = getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
};