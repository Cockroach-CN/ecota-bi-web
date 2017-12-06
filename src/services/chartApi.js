import Ajax from "../commons/Ajax";
import config from "../../static/settings.js";

const basePath = window.settings.basePath;

export function getData() {
    return Ajax.get(`${basePath}/token`).json().send();
}