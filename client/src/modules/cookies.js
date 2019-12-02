let userSearch = ''

const setSearchCookie = (input) => {
    userSearch = document.cookie = "path=/; expires=365 search=" + input + ';'
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