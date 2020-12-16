import { Tile, TileType, TileSidesArgs, SideKeys } from "./tile";

export class CityTile implements Tile {
    public id: string;
    public north: TileType;
    public south: TileType;
    public east: TileType;
    public west: TileType;

    constructor(id: number, sides: TileSidesArgs) {
        this.id = `city-${id}`;
        this.setSide(sides, "north");
        this.setSide(sides, "south");
        this.setSide(sides, "east");
        this.setSide(sides, "west");
    }

    private setSide(sides: TileSidesArgs, key: SideKeys) {
        const side = sides[key];
        this[key] = side == null
            ? "Pavement"
            : side;
    }
}
