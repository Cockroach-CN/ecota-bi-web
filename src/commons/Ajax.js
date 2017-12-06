import {
    last,
    contains
} from "ramda";
import {
    assign
} from "./Object";

const MimeTypes = {
    JSON: "application/json",
};

const HeaderKeys = {
    Accept: "Accept",
    ContentType: "Content-Type",
    ExceptionType: "Exception-Type",
    ExceptionMessage: "Exception-Message",
    APIErrorMessage: "Api-Error-Message",
};

function getResponseHeader(request, key) {
    return request.getResponseHeader(key) ? decodeURIComponent(request.getResponseHeader(key)) : undefined;
}

function parseValue(value) {
    return value === null || value === undefined ? "" : value.toString();
}

function buildVars(source, urlVars) {
    if (urlVars && source) {
        for (const name in urlVars) {
            if (name) {
                const value = parseValue(urlVars[name]);
                source = source.replace(new RegExp(`(\\\$|#)\{${name}\}`, "gi"), value);
            }
        }
    }
    return source;
}

function buildQuery(url, params) {
    if (params && url) {
        const pairs = [];
        for (const key in params) {
            if (key) {
                const value = parseValue(params[key]);
                pairs.push(`${key}${value ? "=" + value : ""}`);
            }
        }
        if (pairs.length > 0) {
            const query = pairs.join("&");
            if (last(url) === "?" || last(url) === "&") {
                return url + query;
            } else if (contains("?", url)) {
                return url + "&" + query;
            } else {
                return url + "?" + query;
            }
        }
    }
    return url;
}

export function buildUrl(
    url,
    params,
    varMap) {
    return buildQuery(buildVars(url, varMap), params);
}

export class AjaxError {
    constructor(
        type,
        message,
        statusCode,
        statusText) {
        this.name = "AjaxError";
        this.stack = this.stack || "";
        this.message = this.message || "";
    }
}



export default class Ajax {
    static get(url) {
        return new Ajax({
            method: "GET",
            url
        });
    }
    static post(url) {
        return new Ajax({
            method: "POST",
            url
        });
    }
    static put(url) {
        return new Ajax({
            method: "PUT",
            url
        });
    }
    static patch(url) {
        return new Ajax({
            method: "PATCH",
            url
        });
    }
    static delete(url) {
        return new Ajax({
            method: "DELETE",
            url
        });
    }
    static handle(handler) {
        Ajax.handlers.push(handler);
    }

    static mapUrl(urlVars) {
        Ajax.urlVars = assign(Ajax.urlVars || {}, urlVars);
    }

    constructor(options) {
        this.options = options;
        this.request;
        this.result;
    }

    send(data) {
        this.request = new XMLHttpRequest();
        this.request.open(
            this.options.method,
            buildUrl(this.options.url, this.options.params, Ajax.urlVars),
            this.options.async !== false,
            this.options.username,
            this.options.password);
        if (this.options.headers) {
            for (const key in this.options.headers) {
                if (this.options.headers[key]) {
                    this.request.setRequestHeader(key, this.options.headers[key]);
                }
            }
        }
        const result = new Promise((resolve, reject) => {
            this.request.onreadystatechange = (event) => {
                if (this.request.readyState === 4) {
                    let error;
                    if (this.request.status >= 200 && this.request.status < 400) {
                        this.result = this.request.responseText || this.request.responseXML;
                        if (this.result &&
                            this.options.headers &&
                            this.options.headers[HeaderKeys.Accept] &&
                            this.options.headers[HeaderKeys.Accept].toLowerCase() === MimeTypes.JSON) {
                            try {
                                this.result = JSON.parse(this.result);
                            } catch (e) {
                                error = e;
                            }
                        }
                    } else {
                        if (this.request.status === 401) {
                            error = new AjaxError(null, "认证失败", this.request.status, this.request.statusText);
                        } else {
                            error = new AjaxError(
                                getResponseHeader(this.request, HeaderKeys.ExceptionType),
                                getResponseHeader(this.request, HeaderKeys.ExceptionMessage) ||
                                getResponseHeader(this.request, HeaderKeys.APIErrorMessage),
                                this.request.status,
                                this.request.statusText);
                        }
                    }
                    for (let handler of Ajax.handlers) {
                        if (handler.postRequest && handler.postRequest(this.request) === false) {
                            return; // Exit "XMLHttpRequest.onreadystatechange" method.
                        }
                    }
                    this.result = error || this.result;
                    error ? reject(error) : resolve(this.result);
                }
            };
            for (let handler of Ajax.handlers) {
                if (handler.preRequest && handler.preRequest(this.request) === false) {
                    return; // Exit Promise executor method.
                }
            }
            this.request.send(data);
        });
        return result;
    }

    header(key, value) {
        this.options.headers = this.options.headers || {};
        this.options.headers[key] = value;
        return this;
    }

    abort() {
        this.request.abort();
        return this;
    }

    json() {
        this.options.headers = this.options.headers || {};
        this.options.headers[HeaderKeys.ContentType] = this.options.headers[HeaderKeys.Accept] = MimeTypes.JSON;
        return this;
    }

    params(params) {
        this.options.params = assign(this.options.params || {}, params);
        return this;
    }
}

Ajax.urlVars = {};
Ajax.handlers = [];