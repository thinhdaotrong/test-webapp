
 
const isLoggedIn = () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token')
}

const setUser = (user) => {
    const { id, full_name, email, token, org_id, role_name } = user;
    // if (isLocal) {
        localStorage.setItem('user_id', id);
        localStorage.setItem('full_name', full_name);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('org_id', org_id);
        localStorage.setItem('role_name', role_name);
        if ( role_name === 'org_admin') {
            localStorage.setItem('role', 'admin');
        } else {
            localStorage.setItem('role', 'client');
        }
    // } else {
    //     sessionStorage.setItem('user_id', id);
    //     sessionStorage.setItem('name', name);
    //     sessionStorage.setItem('token', auth_token);
    // }
}

const setEmail = (email) => {
    localStorage.setItem('email', email);
}

const getEmail = () => {
    return localStorage.getItem('email');
}

const setRole = (role) => {
    localStorage.setItem('role', role);
}

const getRole = () => {
    return localStorage.getItem('role');
}

const setName = (name) => {
    localStorage.setItem('name', name);
    sessionStorage.setItem('name', name);
}

const getToken = () => {
    if (localStorage.getItem('token')) {
        return localStorage.getItem('token');
    }
    return sessionStorage.getItem('token');
}

const getUserId = () => {
    if (localStorage.getItem('user_id')) {
        return localStorage.getItem('user_id');
    }
    return sessionStorage.getItem('user_id');
}

const getName = () => {
    if (localStorage.getItem('name')) {
        return localStorage.getItem('name');
    }
    return sessionStorage.getItem('name');
}

const getOrgId = () => {
    if (localStorage.getItem('org_id')) {
        return localStorage.getItem('org_id');
    }
    return sessionStorage.getItem('org_id');
}

const getRoleName = () => {
    if (localStorage.getItem('role_name')) {
        return  localStorage.getItem('role_name');
    }
    return sessionStorage.getItem('role_name');
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('full_name');
    localStorage.removeItem('user_id');
    localStorage.removeItem('email');
    localStorage.removeItem('org_id');
    localStorage.removeItem('role_name');
    localStorage.removeItem('role');
}

const login = (user) => {
    setUser(user);
}

export default {
    login,
    logout,
    isLoggedIn,
    setName,
    getToken,
    getUserId,
    getName,
    getOrgId,
    getRoleName,
    setRole,
    getRole,
    setEmail,
    getEmail
}