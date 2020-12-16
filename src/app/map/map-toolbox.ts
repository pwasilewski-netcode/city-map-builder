import { MapGrid } from "./map-grid";
import { MapTiles } from "./map-tiles";
import { Tile, TileType, SideKeys, TileTypeArray } from "../tiles/tile";

interface DesignCategory {
    category: string;
    tiles: Tile[];
}

interface TileCategories {
    tile: Tile;
    categories: CategoryCount[];
}

interface CategoryCount {
    category: TileType;
    count: number;
}

interface TileFactor {
    tile: Tile;
    factor: number;
}

export class MapToolbox {
    private designCategories: DesignCategory[];
    private toolboxElement: HTMLElement;

    constructor(private mapGrid: MapGrid,
                mapTiles: MapTiles) {
        this.designCategories = this.getDesignCategories([...mapTiles.tiles]);
    }

    init() {
        const btnDesign = document.getElementById("btn-design");
        this.toolboxElement = document.getElementById("map-toolbox-design");
        btnDesign.addEventListener("click", () => {
            const isDesign = btnDesign.classList.toggle("btn--active");
            this.toolboxElement.classList.toggle("map-toolbox--hidden", !isDesign);
            this.mapGrid.isDesign = isDesign;
        });
        this.initCategories();
    }

    private initCategories() {
        this.toolboxElement.innerHTML = "";
        this.designCategories.forEach(c => this.toolboxElement.appendChild(this.createCategory(c)));
    }

    private createCategory(designCategory: DesignCategory): HTMLElement {
        const category = document.createElement("div");
        category.className = "map-toolbox-category";
        const title = document.createElement("h2");
        title.innerText = designCategory.category;
        category.appendChild(title);
        const list = document.createElement("ul");
        list.addEventListener("click", (e: UIEvent) => {
            const target = <HTMLElement>e.target;
            if (target.tagName != "LI")
                return;

            this.toolboxElement.querySelectorAll("li").forEach(li =>{
                li.classList.remove("map-toolbox-item--active");
            });
            target.classList.toggle("map-toolbox-item--active");
            this.mapGrid.setDesignTile(this.getTile(target));
        });
        category.appendChild(list)
        designCategory.tiles.forEach(tile => {
            list.appendChild(this.createCategoryTile(tile.id));
        })
        return category;
    }

    private createCategoryTile(tileId: string): HTMLElement {
        const item = document.createElement("li");
        this.setTile(item, tileId);
        return item;
    }

    private getDesignCategories(tiles: Tile[]): DesignCategory[] {
        const tilesCategories = tiles.map(this.getTileCategories);
        return TileTypeArray.map(tileType => this.getDesignCategory(tileType, tilesCategories));
    }

    private getDesignCategory(tileType: TileType, tilesCategories: TileCategories[]): DesignCategory {
        const tileIndex = (tile: Tile) => {
            return parseInt(tile.id.substr(tile.id.lastIndexOf("-") + 1));
        };
        const orderBy = (t1: TileFactor, t2: TileFactor) => {
            const diff = t2.factor - t1.factor;
            if (diff != 0)
                return diff;
            
            return tileIndex(t1.tile) - tileIndex(t2.tile);
        };
        let tiles = tilesCategories
            .map<TileFactor>(tc => {
                const categories = tc.categories.filter(c => c.category == tileType)
                return {
                    tile: tc.tile,
                    factor: categories.length > 0 ? categories[0].count : 0
                }
            })
            .filter(t => t.factor > 0)
            .sort(orderBy);
        if (tileType == "Pavement") {
            tiles = tiles.filter(t => t.factor == 4);
        }
        return {
            category: tileType,
            tiles: tiles.map(t => t.tile)
        }
    }

    private getTileCategories(tile: Tile) : TileCategories {
        const categories = new Map<TileType, number>();
        const setCategory = (side: SideKeys) => {
            const tileType = tile[side];
            const count = categories.has(tileType)
                ? categories.get(tileType)
                : 0;
            categories.set(tileType, count + 1);
        };
        setCategory("north");
        setCategory("south");
        setCategory("east");
        setCategory("west");

        const categoriesCounts: CategoryCount[] = [];
        categories.forEach((count, category) => categoriesCounts.push({
            category: category,
            count: count
        }));

        return {
            tile: tile,
            categories: categoriesCounts
        };
    }

    private getTile(tileElement: HTMLElement): string {
        return tileElement.dataset.tile;
    }

    private setTile(tileElement: HTMLElement, tileId: string) {
        tileElement.dataset.tile = tileId;
    }
}