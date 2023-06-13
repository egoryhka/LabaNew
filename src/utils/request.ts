import { request, RequestOptions } from "@umijs/max";

const baseUrl = "https://localhost:44396";

const myRequest = (url: string, opts: RequestOptions = {
    method: 'GET',
}) => {
    const finalURL = baseUrl.concat(url);
    console.log(finalURL)
    const token = localStorage.getItem("token");
    const headers = { ...opts.headers ?? {}, Authorization: "Bearer " + token }
    return request(finalURL, { ...opts, headers });
}

export default myRequest;
