import { prop } from "../common";
import { SideKeys, Tile, TileType, TileTypeArray } from "../tiles/tile";
import { CityTile } from "../tiles/city-tile";

export class MapTiles {
    private tilesMap: Map<string, Tile>;
    private oppositeSides: Map<SideKeys, SideKeys> = new Map([
        ["north", "south"],
        ["south", "north"],
        ["east", "west"],
        ["west", "east"]
    ]);
    private matchedTiles: Map<TileType, Set<TileType>> = new Map();

    public tiles: readonly Tile[];

    constructor() {
        this.initMatchedTileTypes();
        this.initTiles();
    }

    private initMatchedTileTypes() {
        TileTypeArray.forEach(t => {
            this.matchedTiles.set(t, new Set<TileType>([t, "Pavement", "Grass", "Wall"]));
        });
        this.matchedTiles.set("Pavement", new Set(TileTypeArray));
        this.matchedTiles.set("Grass", new Set(TileTypeArray));
        this.matchedTiles.set("Wall", new Set(TileTypeArray));
    }

    private initTiles() {
        this.tiles = [
            new CityTile(0, { north: "Grass", south: "Grass", east: "Grass", west: "Grass" }),
            new CityTile(1, { north: "Grass", south: "Grass", east: "Grass", west: "Grass" }),
            new CityTile(2, { east: "Road", west: "Road" }),
            new CityTile(3, { north: "Road", south: "Road" }),
            new CityTile(4, { west: "Wall" }),
            new CityTile(5, { north: "RoadThin", south: "RoadThin" }),
            new CityTile(6, { east: "Road", west: "Road" }),
            new CityTile(7, { south: "Wall" }),
            new CityTile(8, { east: "Wall" }),
            new CityTile(9, { south: "RoadThin" }),
            new CityTile(10, { east: "RoadThin", west: "RoadThin" }),
            new CityTile(11, { west: "Wall" }),
            new CityTile(12, { north: "Wall" }),
            new CityTile(13, { north: "RoadTunnel", south: "Road" }),
            new CityTile(14, { east: "RoadThin" }),
            new CityTile(15, { west: "RoadThin" }),
            new CityTile(16, { south: "Wall" }),
            new CityTile(17, { east: "Wall" }),
            new CityTile(18, { east: "Road", west: "RoadTunnel" }),
            new CityTile(19, { east: "RoadTunnel", west: "Road" }),
            new CityTile(20, { south: "RoadThin", east: "RoadThin" }),
            new CityTile(21, { north: "RoadThin" }),
            new CityTile(22, { south: "RoadThin", east: "Road", west: "Road" }),
            new CityTile(23, { north: "Wall" }),
            new CityTile(24, { north: "PavementTunnel" }),
            new CityTile(25, { north: "Road", south: "RoadTunnel" }),
            new CityTile(26, { north: "RoadTunnel", south: "RoadTunnel" }),
            new CityTile(27, { north: "RoadThin", east: "RoadThin" }),
            new CityTile(28, { south: "RoadThin", west: "RoadThin" }),
            new CityTile(29, { north: "Road", south: "Road", east: "RoadThin" }),
            new CityTile(30, { north: "Road", south: "Road", west: "RoadThin" }),
            new CityTile(31, { west: "PavementTunnel" }),
            new CityTile(32, { east: "PavementTunnel" }),
            new CityTile(33, { east: "RoadTunnel", west: "RoadTunnel" }),
            new CityTile(34, { east: "RoadTunnel", west: "RoadTunnel" }),
            new CityTile(35, { north: "RoadThin", west: "RoadThin" }),
            new CityTile(36, { east: "Road", west: "Road" }),
            new CityTile(37, { north: "RoadThin", east: "Road", west: "Road" }),
            new CityTile(38, { north: "WaterThin", south: "WaterThin" }),
            new CityTile(39, { south: "PavementTunnel" }),
            new CityTile(40, { north: "RoadUnderground", south: "Road" }),
            new CityTile(41, { north: "RoadTunnel", south: "RoadTunnel" }),
            new CityTile(42, { north: "Road", south: "Road" }),
            new CityTile(43, { }),
            new CityTile(44, { north: "Road", south: "Road" }),
            new CityTile(45, { south: "WaterThin" }),
            new CityTile(46, { east: "WaterThin", west: "WaterThin" }),
            new CityTile(47, { east: "Road", west: "RoadUnderground" }),
            new CityTile(48, { east: "RoadUnderground", west: "Road" }),
            new CityTile(49, { east: "Road", west: "Road" }),
            new CityTile(50, { north: "Road", south: "Road" }),
            new CityTile(51, { }),
            new CityTile(52, { east: "WaterThin" }),
            new CityTile(53, { west: "WaterThin" }),
            new CityTile(54, { north: "GrassThin", south: "GrassThin" }),
            new CityTile(55, { north: "Road", south: "RoadUnderground" }),
            new CityTile(56, { north: "Road", south: "Road" }),
            new CityTile(57, { east: "Road", west: "Road" }),
            new CityTile(58, { east: "Road", west: "Road" }),
            new CityTile(59, { }),
            new CityTile(60, { north: "WaterThin" }),
            new CityTile(61, { south: "GrassThin" }),
            new CityTile(62, { east: "GrassThin", west: "GrassThin" }),
            new CityTile(63, { north: "Road", south: "Road", west: "Road" }),
            new CityTile(64, { east: "Road", west: "Road" }),
            new CityTile(65, { north: "Road", south: "Road" }),
            new CityTile(66, { }),
            new CityTile(67, { }),
            new CityTile(68, { east: "GrassThin" }),
            new CityTile(69, { west: "GrassThin" }),
            new CityTile(70, { east: "Road", west: "Road" }),
            new CityTile(71, { north: "Road", east: "Road", west: "Road" }),
            new CityTile(72, { north: "Road", south: "Road" }),
            new CityTile(73, { east: "Road", west: "Road" }),
            new CityTile(74, { north: "Water", south: "Water" }),
            new CityTile(75, { north: "GrassThin", south: "GrassThin" }),
            new CityTile(76, { north: "GrassThin" }),
            new CityTile(77, { east: "Road", west: "Road" }),
            new CityTile(78, { north: "Road", south: "Road" }),
            new CityTile(79, { south: "Road", east: "Road", west: "Road" }),
            new CityTile(80, { north: "Road", south: "Road", east: "Road", west: "Road" }),
            new CityTile(81, { north: "Road", south: "Road" }),
            new CityTile(82, { north: "Road", south: "Road", east: "Road", west: "Road" }),
            new CityTile(83, { east: "GrassThin", west: "GrassThin" }),
            new CityTile(84, { north: "Road", south: "Road" }),
            new CityTile(85, { north: "Road", south: "Road" }),
            new CityTile(86, { north: "Road", south: "Road", east: "Road" }),
            new CityTile(87, { north: "Road", south: "Road", west: "Road" }),
            new CityTile(88, { north: "Road", south: "Road", west: "Road" }),
            new CityTile(89, { north: "Road", south: "Road", east: "Road", west: "Road" }),
            new CityTile(90, { east: "PavementHill" }),
            new CityTile(91, { north: "Road", east: "Road", west: "Road" }),
            new CityTile(92, { east: "Road", west: "Road" }),
            new CityTile(93, { north: "Road", south: "Road", east: "Road", west: "Road" }),
            new CityTile(94, { north: "Road", east: "Road", west: "Road" }),
            new CityTile(95, { north: "Road", south: "Road", east: "Road" }),
            new CityTile(96, { south: "Road", east: "Road", west: "Road" }),
            new CityTile(97, { north: "PavementHill" }),
            new CityTile(98, { south: "PavementHill" }),
            new CityTile(99, { north: "Road", south: "Road" }),
            new CityTile(100, { north: "Road", south: "Road", east: "Road", west: "Road" }),
            new CityTile(101, { north: "Road", south: "Road", east: "Road", west: "Road" }),
            new CityTile(102, { east: "RoadHill", west: "Road" }),
            new CityTile(103, { north: "Road", east: "Road", west: "Road" }),
            new CityTile(104, { east: "Road" }),
            new CityTile(105, { west: "PavementHill" }),
            new CityTile(106, { east: "Road", west: "Road" }),
            new CityTile(107, { north: "Road", south: "Road", east: "Road", west: "Road" }),
            new CityTile(108, { north: "RoadHill", south: "Road" }),
            new CityTile(109, { north: "Road", south: "RoadHill" }),
            new CityTile(110, { south: "Road" }),
            new CityTile(111, { west: "Road" }),
            new CityTile(112, { north: "Road", south: "Road" }),
            new CityTile(113, { south: "Road", east: "Road" }),
            new CityTile(114, { east: "Road", west: "RoadHill" }),
            new CityTile(115, { east: "RoadHill", west: "Road" }),
            new CityTile(116, { north: "Road" }),
            new CityTile(117, { north: "Road", east: "Road", west: "Road" }),
            new CityTile(118, { south: "Road", east: "Road", west: "Road" }),
            new CityTile(119, { north: "RoadHill", south: "Road" }),
            new CityTile(120, { north: "Road", south: "RoadHill" }),
            new CityTile(121, { north: "Road", west: "Road" }),
            new CityTile(122, { south: "Road", east: "Road" }),
            new CityTile(123, { east: "Road", west: "RoadHill" }),
            new CityTile(124, { north: "Road", east: "Road" }),
            new CityTile(125, { south: "Road", west: "Road" }),
            new CityTile(126, { north: "Road", west: "Road" }),
            new CityTile(127, { east: "Water", west: "Water" })
        ];

        this.tilesMap = new Map(this.tiles.map(t => [t.id, t]));
    }

    getTile(id: string): Tile {
        return this.tilesMap.get(id);
    }

    doTilesMatch(tile1: Tile, side: SideKeys, tile2: Tile): boolean {
        const tileType1 = prop(tile1, side);
        const tileType2 = prop(tile2, this.oppositeSides.get(side));
        return this.matchedTiles.get(tileType1).has(tileType2);
    }
}