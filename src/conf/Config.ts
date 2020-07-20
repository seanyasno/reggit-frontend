import localConfig from './local-config.json';

export default class Config {
    private static config: Config;
    private static loadLocalConfiguration: boolean = true;

    static getInstance(): Config {
        if (!this.config) {
            this.config = new Config();
        }

        return this.config;
    }

    static getConfiguration() {
        if (this.loadLocalConfiguration) {
            return localConfig;
        }

        return localConfig;
    }

    static getServerUrl(): string {
        return this.getConfiguration().SERVER_URL + ':' + this.getConfiguration().SERVER_PORT;
    }
}