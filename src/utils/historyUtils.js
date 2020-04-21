export const reloadPage = (history) => {
    const curentLocation = history.location.pathname + history.location.search
    history.push(curentLocation)
}

export const previousPath = (location) => {
    let previousPath = location.pathname;
    if (location.search) {
        previousPath += location.search;
    }
    return previousPath;
}