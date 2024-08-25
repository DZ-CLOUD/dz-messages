function resJSON(res, status, code, body) {
    const now = Date.now();
    res.status(code).json({ "requestSend": now, status, code, body })
}

function resCode(res, code, message) {
    switch (code) {
        case 200:
            resJSON(res, "success", code, message)
            break;
        case 201:
            resJSON(res, "success", code, message)
            break;
        case 400:
            resJSON(res, "error", code, message || "Your request isn't right!")
            break;
        case 401:
            resJSON(res, "error", code, message || "Unauthorized!")
            break;
        case 404:
            resJSON(res, "error", code, message || "Content not found!")
            break;
        case 500:
            resJSON(res, "error", code, message || "An unexpected error occured!")
            break;
    
        default:
            resJSON(res, "error", code, message || "Unvalid resonse params from server!")
            break;
    }
}

function resRender(res, code, view, objects) {
    res.status(code).render(view, objects);
}

function resRedirect(res, code, path) {
    res.status(code).redirect(path);
}

module.exports = { resJSON, resCode, resRender, resRedirect }