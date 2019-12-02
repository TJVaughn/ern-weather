let userSearch = ''

const setSearchCookie = (input) => {
    userSearch = document.cookie = "path=/; expires=365 search=" + input + ';'
}

const getSearchCookie = () => {
    let search = document.cookie;
    console.log(search.split('').splice(40, 11));
    return userSearch = search.split('').splice(40, 11);
}

export { setSearchCookie, getSearchCookie, userSearch };