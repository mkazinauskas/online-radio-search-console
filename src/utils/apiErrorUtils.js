export const extractErrors = (response) => {
    if (!response || !response.response || !response.response.data || !response.response.data.fields) {
        return [];
    }
    const { data } = response.response;
    return data.fields.map(field => {
        return {
            name: field,
            errors: [data.message],
        }
    });
}