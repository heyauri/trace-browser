import { v4 as uuidv4 } from "uuid";

let userAgents = [
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
];

export let getUserAgent = function () {
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

export let generateUUID = function () {
    return uuidv4();
}
