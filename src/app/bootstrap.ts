import { MapGrid } from "./map/map-grid";
import { MapStorage } from "./map/map-storage";
import { MapToolbox } from "./map/map-toolbox";
import { MapTiles } from "./map/map-tiles";

export class Bootstrap {
    constructor() {
        window.addEventListener("DOMContentLoaded", () => this.onload());
    }

    private onload() {
        const map = new MapGrid(32, "city-1");
        map.init();
        setTimeout(() => {
            this.scrollCenter();
        }, 1000);

        const mapTiles = new MapTiles();

        const storage = new MapStorage(map);
        storage.load();
        storage.autoSave();

        const toolbox = new MapToolbox(map, mapTiles);
        toolbox.init();
    }

    private scrollCenter() {
        const scrollX = (document.body.scrollWidth - window.innerWidth) / 2;
        const scrollY = 50 + (document.body.scrollHeight - window.innerHeight) / 2;
        window.scroll(scrollX, scrollY);
    }
}