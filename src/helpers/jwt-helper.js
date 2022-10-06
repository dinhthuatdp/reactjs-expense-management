const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const getRoles = (token) => {
    const tokenDecoded = parseJwt(token);
    if (tokenDecoded) {
        let roles = [];
        Object.keys(tokenDecoded).forEach(function (key) {
            let res = key.split('/');
            if (res.length > 1) {
                if (res[res.length - 1] === 'role') {
                    roles = tokenDecoded[key];
                }
            }
        });
        return roles;
    }
    return [];
}

const hasPermission = (roles) => {
    if (!roles ||
        roles.length == 0) {
        return false;
    }
    const storedRoles = getRoles(localStorage.getItem('token'));
    if (!storedRoles) {
        return false;
    }
    for (const x of storedRoles) {
        if (roles.some(r => r === x)) {
            return true;
        }
    }
    return false;
}

export {
    parseJwt,
    getRoles,
    hasPermission
};