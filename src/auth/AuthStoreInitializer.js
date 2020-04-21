import { keycloakConfiguration } from "./keycloakConfiguration";
import { refresh, error } from "./actions";
export const initialize = (authStore) => {
    const keycloak = keycloakConfiguration;

    keycloak
        .init({ promiseType: 'native', onLoad: 'check-sso' })
        .then(() => {
            authStore.dispatch(refresh(keycloak));
            setInterval(() => {
                if (keycloak.authenticated) {
                    keycloak.updateToken()
                        .then(
                            refreshed => {
                                if (refreshed) {
                                    authStore.dispatch(refresh(keycloak));
                                }
                            }, () => {
                                authStore.dispatch(refresh(keycloak));
                            }
                        );
                }
            }, 5000);
        })
        .catch(() => {
            authStore.dispatch(error(keycloak))
        });


    return authStore;
}