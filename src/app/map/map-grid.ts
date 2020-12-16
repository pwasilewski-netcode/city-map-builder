import { MapInfo } from "./map-info";

const tileMinIndex = 0;
const tileMaxIndex = 127;

interface ForEachIndexFunction {
    (index: number): void;
}

interface ForEachTileFunction {
    (tileElement: HTMLElement, index?: number): void;
}

export class MapGrid {
    private mapGrid: HTMLElement;
    private designTileId: string;
    public name: string = "My lovely city";

    constructor(private size: number,
                private defaultTileId: string = null) {
        this.designTileId = defaultTileId;
    }

    get area(): number {
        return this.size * this.size;
    }

    get isDesign(): boolean {
        return this.mapGrid == null
            ? false
            : this.mapGrid.classList.contains("map--design");
    }

    set isDesign(value: boolean) {
        this.mapGrid.classList.toggle("map--design", value);
    }

    init() {
        this.mapGrid = document.getElementById("map-grid");
        this.mapGrid.innerHTML = "";

        this.forEachIndex(i => {
            this.mapGrid.appendChild(this.createTile(i));
        });

        this.mapGrid.addEventListener("contextmenu", (e: UIEvent) => {
            e.preventDefault();
            this.changeTile(<HTMLElement>e.target, this.defaultTileId);
            return false;
        }, false);

        this.mapGrid.addEventListener("click", (e: UIEvent) => {
            this.changeTile(<HTMLElement>e.target, this.designTileId);
        });

        this.mapGrid.addEventListener("mousemove", (e: UIEvent) => {
            
        });

        (<HTMLElement>document.querySelector("#map-header > h1")).innerText = this.name;
    };

    load(info: MapInfo): void {
        this.forEachTile((tileElement, index) => {
            this.setTile(tileElement, info.tiles[index]);
        })
    }

    getInfo(): MapInfo {
        const tiles: string[] = [];
        this.forEachTile(tileElement => {
            tiles.push(this.getTile(tileElement));
        });
        return {
            name: this.name,
            tiles: tiles
        };
    }

    setDesignTile(tileId: string) {
        this.designTileId = tileId;
    }

    private forEachIndex(callback: ForEachIndexFunction) {
        for (let i = 1; i <= this.area; i++) {
            callback(i);
        }
    }

    private forEachTile(callback: ForEachTileFunction) {
        this.forEachIndex(i => callback(this.getTileElement(i), i));
    }

    private getTile(tileElement: HTMLElement): string {
        return tileElement.dataset.tile;
    }

    private setTile(tileElement: HTMLElement, tileId: string) {
        tileElement.dataset.tile = tileId;
    }

    private changeTile(tileElement: HTMLElement, newTileId: string) {
        if (!this.isDesign || !tileElement.classList.contains("map-tile"))
            return;

        this.setTile(tileElement, newTileId);
    }

    private tileId(index: number): string {
        return `map-tile-${index}`;
    }

    private createTile(index: number): HTMLElement {
        const tile = document.createElement("div");
        tile.className = "map-tile";
        tile.id = this.tileId(index);
        if (this.defaultTileId != null) {
            this.setTile(tile, this.defaultTileId);
        }
        return tile;
    }

    private getTileElement(index: number): HTMLElement {
        const id = this.tileId(index);
        return document.getElementById(id);
    }
}