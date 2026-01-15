interface AccessRecord {
    uuid: string;
    history: Map<string, number>;
}

class AccessRecord {
    constructor(uuid: string) {
        this.uuid = uuid;
        this.history = new Map<string, number>();
    }

    push(url: string) {
        this.history.set(url, (this.history.get(url) || 0) + 1);
    }

    getHistory(): Map<string, number> {
        return new Map(this.history);
    }

    getDomainHistory(): Map<string, number> {
        let domainHistory = new Map<string, number>();
        this.history.forEach((count, url) => {
            try {
                let urlObj = new URL(url);
                let domain = urlObj.hostname;
                domainHistory.set(domain, (domainHistory.get(domain) || 0) + count);
            } catch (e) {
                // Invalid URL, skip
            }
        });
        return domainHistory;
    }

    getSize(): number {
        return this.history.size;
    }

    getDomainSize(): number {
        return this.getDomainHistory().size;
    }
}

export { AccessRecord };
