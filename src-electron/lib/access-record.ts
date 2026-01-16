interface AccessRecord {
    uuid: string;
    history: Map<string, number>;
    domain: Map<string, number>;
}

class AccessRecord {
    constructor(uuid: string) {
        this.uuid = uuid;
        this.history = new Map<string, number>();
        this.domain = new Map<string, number>();
    }

    push(url: string) {
        this.history.set(url, (this.history.get(url) || 0) + 1);
        try {
            let urlObj = new URL(url);
            let domain = urlObj.hostname;
            this.domain.set(domain, (this.domain.get(domain) || 0) + 1);
        } catch (e) {
            // Invalid URL, skip
        }
    }

    getHistory(): Map<string, number> {
        return new Map(this.history);
    }

    getDomainHistory(): Map<string, number> {
        return new Map(this.domain);
    }

    getDomainList(): Object[] {
        return Array.from(this.domain.entries()).map(([domain, count]) => {
            return { domain, count };
        });
    }

    getSize(): number {
        return this.history.size;
    }

    getDomainSize(): number {
        return this.getDomainHistory().size;
    }
}

export { AccessRecord };
