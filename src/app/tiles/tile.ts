enum TileTypeEnum {
    Road,
    RoadHill,
    RoadTunnel,
    RoadUnderground,
    RoadThin,
    Pavement,
    PavementHill,
    PavementTunnel,
    Grass,
    GrassThin,
    Water,
    WaterThin,
    Wall,
}

export type TileType = keyof typeof TileTypeEnum;

export const TileTypeArray: readonly TileType[] = tileTypes();

export interface Tile {
    id: string;
    north: TileType;
    south: TileType;
    east: TileType;
    west: TileType;
};

export interface TileSidesArgs {
    north?: TileType;
    south?: TileType;
    east?: TileType;
    west?: TileType;
}

export type SideKeys = keyof TileSidesArgs;

function tileTypes(): TileType[] {
    const arr: TileType[] = [];
    for (let tileType in TileTypeEnum) {
        if (isNaN(parseInt(tileType)))
            arr.push(<TileType>tileType);
    }
    return arr;
}