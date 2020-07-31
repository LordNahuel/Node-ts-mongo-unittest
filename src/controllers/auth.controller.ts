const roles: Array<string> = [];   
export const setRoles = function (role: Array<string>) {
    role.forEach(element => {
        roles.push(element);
    });
}

export const isAuthorized = (neededRoles: string) => {
    console.log("roles", roles)
    return roles.indexOf(neededRoles) >= 0; 
}

export const isAuthorizedAsync = function (neededRoles: string, cb: CallableFunction) {
    setTimeout(function () { cb(roles.indexOf(neededRoles) >= 0)}, 2100);
} 