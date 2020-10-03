import { SET_LOGIN_USER } from "../actions/loginUser";

export default function loginUser(state = null, action) {
    switch(action.type) {
        case SET_LOGIN_USER:
            return action.id;
        default:
            return state;
    }
}