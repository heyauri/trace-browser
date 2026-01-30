import { v4 as uuidv4 } from "uuid";
import * as xlsx from "node-xlsx";
import { AccessRecord } from "./access-record";
import * as fs from "fs";
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

// 从URL中提取协议
function getProtocol(url: string): string {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol.replace(':', '');
    } catch (e) {
        return 'unknown';
    }
}

export let exportAccessRecordToExcel = async function (access_record: AccessRecord, save_path: string) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            let domain_history: any = access_record.getDomainList();
            let domain_data = [
                ["Domain", "Access Count"]
            ];
            domain_data = domain_data.concat((domain_history.map((item: any) => { return [item['domain'], item['count']] })).sort((a: any, b: any) => {
                return b[1] - a[1];
            }))

            let url_history_map = access_record.getURL();
            let url_data: any = [
            ];
            for (let [url, count] of url_history_map.entries()) {
                url_data.push([url, count]);
            }
            url_data = url_data.sort((a: any, b: any) => {
                return b[1] - a[1];
            });
            url_data.unshift(["URL", "Access Count"]);

            let request_history: any = access_record.request;
            request_history.sort((a: any, b: any) => {
                return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
            });
            let request_data: any = [
                ["URL", "Timestamp", "Protocol", "Method", "Status", "Status Code", "Error"]
            ];
            request_data = request_data.concat(request_history.map((item: any) => {
                const protocol = getProtocol(item.url);
                return [item.url, item.timestamp, protocol, item.method, item.status, item.statusCode, item.error];
            }));


            let options = {
                '!cols': [{ wch: 50 }, { wch: 20 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 50 }, { wch: 10 }]
            };
            let worksheets: any = [
                { name: "Domain Statistics", data: domain_data, options },
                { name: "URL Statistics", data: url_data, options },
                { name: "Request History", data: request_data, options }
            ];

            let buffer = xlsx.build(worksheets);
            await fs.promises.writeFile(save_path, buffer);
            resolve();
        } catch (error) {
            return reject(error);
        }
    });
};
