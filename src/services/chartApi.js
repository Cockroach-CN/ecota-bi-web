import Ajax from "../commons/Ajax";

const settings = window.settings;

export function getData() {
    return Ajax.get(`${settings.basePath}/token`).json().send();
}