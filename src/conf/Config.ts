import localConfig from './local-config.json';

export default class Config {
    private static config: Config;
    private loadLocalConfiguration: boolean = true;

    public static getInstance() {
        if (!this.config) {
            this.config = new Config();
        }

        return this.config;
    }

    public getConfiguration() {
        if (this.loadLocalConfiguration) {
            return localConfig;
        }

        return localConfig;
    }

    public getServerUrl(): string {
        return this.getConfiguration().SERVER_URL + ':' + this.getConfiguration().SERVER_PORT;
    }
}