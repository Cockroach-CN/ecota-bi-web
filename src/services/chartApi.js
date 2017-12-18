import Ajax from "../commons/Ajax";
import $ from "jquery";

const settings = window.settings;

export function getData() {
    return Ajax.get(`${settings.basePath}/token`).json().send();
}