import Keycloak from 'keycloak-js';
import { KEYCLOAK_URL } from './../AppConfig';

export const keycloakConfiguration = Keycloak({
    "realm": "online-radio-search",
    "url": KEYCLOAK_URL,
    "ssl-required": "external",
    "resource": "online-radio-search-dynamic-web",
    "public-client": true,
    "clientId": "online-radio-search-dynamic-web"
});