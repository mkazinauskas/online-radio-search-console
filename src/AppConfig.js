const resolveNotEmptyUrl = (urls, errorMessage) => {
    const notEmptyUrls = urls.filter(url => url !== undefined);
    if (notEmptyUrls.length === 0) {
        throw new Error(errorMessage);
    }
    return notEmptyUrls[0];
}

const resolveApiUrl = () => {
    return resolveNotEmptyUrl(
        [window.env.REACT_APP_API_URL, process.env.REACT_APP_API_URL],
        'Failed to resolve api url...'
    );
}

const resolveKeycloakUrl = () => {
    return resolveNotEmptyUrl(
        [window.env.REACT_APP_KEYCLOAK_URL, process.env.REACT_APP_KEYCLOAK_URL],
        'Failed to resolve keycloak url...'
    );
}

export const API_URL = resolveApiUrl();

export const KEYCLOAK_URL = resolveKeycloakUrl();
