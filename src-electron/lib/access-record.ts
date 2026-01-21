import dayjs from "dayjs";

interface AccessRecord {
    uuid: string;
    url: Map<string, number>;
    domain: Map<string, number>;
    request: { url: string, timestamp: string, method: string, status: boolean, statusCode: number, error: string }[];
}

class AccessRecord {
    constructor(uuid: string) {
        this.uuid = uuid;
        this.url = new Map<string, number>();
        this.domain = new Map<string, number>();
        this.request = [];
    }

    push(url: string) {
        this.url.set(url, (this.url.get(url) || 0) + 1);
        try {
            let urlObj = new URL(url);
            let domain = urlObj.hostname;
            this.domain.set(domain, (this.domain.get(domain) || 0) + 1);
        } catch (e) {
            // Invalid URL, skip
        }
    }

    recordRequest(url: string, method: string, status: boolean, statusCode: number, error: string) {
        this.request.push({ url, timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'), method, status, statusCode, error });
    }


    getURL(): Map<string, number> {
        return new Map(this.url);
    }

    getDomainHistory(): Map<string, number> {
        return new Map(this.domain);
    }

    getDomainList(): Object[] {
        return Array.from(this.domain.entries()).map(([domain, count]) => {
            return { domain, count };
        });
    }

    getRequestSize(): number {
        return this.request.length;
    }

    getURLSize(): number {
        return this.url.size;
    }

    getDomainSize(): number {
        return this.domain.size;
    }
}

export { AccessRecord };
