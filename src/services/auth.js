export const usuarioAutenticado = () => localStorage.getItem("auth-blocktime-zabbix") !== null;

export const usuarioLogado = () => {
    parseJwt(localStorage.getItem("auth-blocktime-zabbix"))
};

export const parseJwt = () => {
    var base64Url = localStorage.getItem("auth-blocktime-zabbix").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    return JSON.parse(window.atob(base64));
}