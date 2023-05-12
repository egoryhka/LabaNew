import { request, RequestOptions } from "@umijs/max";

const baseUrl = "https://localhost:44396";

const myRequest = (url: string, opts: RequestOptions = { method: 'GET' }) => request(baseUrl + url, opts);

export default myRequest;
