/**
 * Created by ben on 14-11-9.
 */

var urlmap = {
    "/sys/users": require("./data/userstest"),
    "/login/doLogin": require("./data/userlogin"),
    "/doFindpw":require("./data/findpw")

};

module.exports = urlmap;
