let userSearch = ''

const setSearchCookie = (name, input, days) => {
    // userSearch = document.cookie = "path=/; expires=365 search=" + input + ';'
    let date = new Date();
    date.setTime(date.getTime() + (days * 1000 * 60 * 60 * 24));
    let expires = date.toUTCString();
    document.cookie = `${name}=${input};expires=${expires};path=/;`
    console.log(document.cookie);
}
const getSearchCookie = (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        console.log(document.cookie);
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// const getSearchCookie = () => {
//     let search = document.cookie;
//     console.log(search.split('').splice(40, 11));
//     return userSearch = search.split('').splice(40, 11);
// }

export { setSearchCookie, getSearchCookie, userSearch };