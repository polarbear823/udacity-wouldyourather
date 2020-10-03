export const SET_LOGIN_USER = 'SET_LOGIN_USER';

export function setLoginUser(id) {
    return {
        type: SET_LOGIN_USER,
        id
    }
}