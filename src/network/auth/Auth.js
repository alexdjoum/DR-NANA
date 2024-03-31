//import UserService from "../services/UserService";

export const TOKEN_LIFE_TIME = (314496) * 1000; // 364 days of life time
export const TOKEN_KEY = "token";
export const EXPIRE_AT_KEY = "expired_at";
export const ROLE_KEY = "role";
export const USER_KEY = "user";
export const LAST_URL = "LAST_URL";

//This is for managing the opened collapse in admin sidebar
//export const COLLAPSED_KEY = '0';
//export const ACTIVE_TAB = "/admin";

export const APP_ROLES = {
    ROLE_USER: "ROLE_USER",
    ROLE_ADMIN: "ROLE_ADMIN",
    ROLE_ACCOUNTING: "ROLE_ACCOUNTING",
    ROLE_MANAGER: "ROLE_MANAGER",
    ROLE_COURSE: "ROLE_COURSE"
}
const APP_ROLES_HIERARCHY = {
    ROLE_ADMIN: [APP_ROLES.ROLE_USER, APP_ROLES.ROLE_MANAGER, APP_ROLES.ROLE_COURSE, APP_ROLES.ROLE_ACCOUNTING],
    ROLE_ACCOUNTING: [APP_ROLES.ROLE_USER, APP_ROLES.ROLE_MANAGER],
    ROLE_COURSE: [APP_ROLES.ROLE_MANAGER, APP_ROLES.ROLE_USER],
    ROLE_MANAGER: [APP_ROLES.ROLE_USER]
};
export const saveAuthToken = (accessToken, expiredAt) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(EXPIRE_AT_KEY, expiredAt.toString());
};

export const setLastUrl = (url) => {
    localStorage.setItem(LAST_URL, url);
}
export const removeLastUrl = (url) => {
    let last = getLastUrl();
    if (last != null) {
        localStorage.removeItem(LAST_URL);
    }
}
export const getLastUrl = () => {
    const url = localStorage.getItem(LAST_URL);
    return url;
}
export const removeAuthToken = () => {
    localStorage.removeItem(EXPIRE_AT_KEY);
    localStorage.removeItem(TOKEN_KEY);
};

export const getAuthToken = () => {
    const accessToken = localStorage.getItem(TOKEN_KEY) || null;
    const expiresAt = Number(localStorage.getItem(EXPIRE_AT_KEY)) || null;
    const role = localStorage.getItem(ROLE_KEY) || null;
    const userSt = localStorage.getItem(USER_KEY) || null;
    const user = JSON.parse(userSt);
    return {
        expiresAt,
        accessToken,
        role,
        user
    }
};

export const getBearerAccessToken = () => {
    return getAuthToken().accessToken;
}

export const getRole = () => {
    return getAuthToken().role;
}

export const getUser = () => {
    return getAuthToken().user;
}

export const signIn = (data) => {
    let now = (new Date()).getTime();
    let expiresAt = JSON.stringify(now + TOKEN_LIFE_TIME);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(ROLE_KEY, data.role);
    localStorage.setItem(EXPIRE_AT_KEY, expiresAt);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
};

/*export const logout = async () => {
    // Clear access token and ID token from local storage
    //UserService.logout((data)=>{ alert(data.date);});
    const { message, success } = await UserService.logoutAsync();
    //alert(success);
    //alert(message);

    removeLastUrl();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EXPIRE_AT_KEY);
    localStorage.removeItem(USER_KEY);
};*/

export const isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem(EXPIRE_AT_KEY));

    let now = new Date().getTime();
    //alert ("expireAt: "+expiresAt+" and now: "+now);
    if (expiresAt) {
        return now < expiresAt;
    }
    return false;
};

export const hasCredential = (role) => {
    if (!isAuthenticated()) return false;
    const currentRole = getRole();
    // console.log("role:"+role+" the current role is "+currentRole+" "+getBearerAccessToken() );
    return hasRole({ role: currentRole }, role);
}

export const hasRole = (user, role) => {
    const currentRole = user.role;
    if (currentRole !== null || currentRole !== undefined) {
        if (role == currentRole) {
            return true;
        }
        if (APP_ROLES_HIERARCHY[currentRole]) {
            let subRoles = APP_ROLES_HIERARCHY[currentRole];
            console.log(subRoles);
            for (let i = 0; i < subRoles.length; i++) {
                console.log(subRoles[i]);
                console.log(role);
                if (subRoles[i] == role) {
                    return true;
                }
            }
        }
    }
    return false;


}

/*export const refreshUser = async () => {
    if (!isAuthenticated()) return false;
    const user = await UserService.refreshUser();
    if (user) {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return true;

    } else {
        return false;
    }

}*/

/*export const refreshAndGetUser = async () => {
    if (!isAuthenticated()) return null;
    const user = await UserService.refreshUser();
    if (user) {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;

    } else {
        return null;
    }

}*/

//This function is called to set the key for the opened collapsed on sidebar
/*export const setCollapseKey = (elt) => {
    console.log("on veut garder")
    console.log(elt)
    localStorage.setItem(COLLAPSED_KEY, elt);
}*/

/*export const getCollapseKey = () => {
    return localStorage.getItem(COLLAPSED_KEY);
}*/

/*export const setActiveTab = (elt) => {
    console.log("on veut garder")
    console.log(elt)
    localStorage.setItem(ACTIVE_TAB, elt);
}*/

/*
export const getActiveTab = () => {
    return localStorage.getItem(ACTIVE_TAB);
}*/
