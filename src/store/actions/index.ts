export const SET_TOKEN = 'SET_TOKEN';
export const LOGOUT = 'LOGOUT';

export function setToken(payload) {
  return { type: SET_TOKEN, payload };
}

export function logout() {
  return { type: LOGOUT };
}
