
import { SIGN_IN, SIGN_OUT, LOADED, ERROR } from "../actions/types";

const INITIAL_STATE = {
    keycloak: null,
    loading: true,
    authenticated: false,
    token: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            state.keycloak.login();
            return {
                ...state,
                loading: true,
                authenticated: false,
                token: null
            }
        case SIGN_OUT:
            state.keycloak.logout();
            return {
                ...state,
                loading: true,
                authenticated: false,
                token: null
            }
        case LOADED:
            return {
                ...state,
                keycloak: action.payload,
                loading: false,
                authenticated: action.payload.authenticated,
                token: action.payload.token
            }
        case ERROR: 
            return {
                keycloak: action.payload,
                loading: false,
                error: true,
                authenticated: false
            }
        default:
            return state;
    }
};