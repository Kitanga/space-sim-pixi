import * as PIXI from 'pixi.js';

export class Loader {
    private resources: [string, string][];
    loader: PIXI.Loader;

    constructor(resourceList: [string, string][], loader: PIXI.Loader) {
        this.resources = resourceList;
        this.loader = loader;

        this.addResources(this.resources);
    }

    private addResources(resources: [string, string][]) {
        resources.forEach(resourceTuple => {
            this.loader = this.loader.add(...resourceTuple);
        });
    }

    public load(cb?: ((...params: any[]) => any) | undefined): PIXI.Loader {
        return this.loader.load(cb);
    }
}