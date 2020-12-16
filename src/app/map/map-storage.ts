import { MapGrid } from "./map-grid";

export class MapStorage {
    constructor(private mapGrid: MapGrid) {
    }

    load() {
        const json = localStorage.getItem("map");
        if (json == null) {
            console.warn("City map not found in the storage");
            return;
        }
        const mapInfo = JSON.parse(json);
        this.mapGrid.load(mapInfo);
        console.info(`City map "${mapInfo.name}" loaded`);
    }

    save() {
        const mapInfo = this.mapGrid.getInfo();
        const json = JSON.stringify(mapInfo);
        localStorage.setItem("map", json);
        console.info(`City map "${mapInfo.name}" saved`);
    }

    autoSave(timeout: number = 60000) {
        setInterval(() => {
            this.save();
        }, timeout);
    }
}