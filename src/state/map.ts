import {atom} from "recoil";
import TerrainCompressor from "../core/models/TerrainCompressor";

const field = TerrainCompressor.decompress("2:1,1:4,2:1,1:1,2:2,0:2,3:1,0:1,3:1,0:3,3:1,0:1,2:1,1:1,2:1,0:2,3:2,4:6;1:4,2:2,1:1,2:1,0:3,3:2,4:1,3:2,0:2,2:3,0:1,3:3,0:1,3:1,4:1,3:2,4:2;1:6,2:1,1:1,2:1,0:1,3:1,4:1,3:1,4:2,3:1,0:1,2:1,1:2,2:1,0:1,3:4,0:1,3:1,0:2,3:1,4:1;1:2,2:1,1:4,2:1,0:1,3:1,4:1,3:1,0:1,3:1,4:1,3:1,0:1,2:1,1:1,2:1,0:1,2:1,0:3,3:3,0:1,2:1,0:1,3:1;1:1,2:3,1:1,2:1,1:1,2:1,0:1,3:1,4:1,3:2,4:1,3:1,0:1,2:1,1:1,2:1,0:1,2:2,0:1,2:1,0:8;2:2,1:1,2:2,1:2,2:2,0:1,3:2,4:1,3:1,0:1,2:3,0:1,2:1,1:2,2:1,0:1,3:1,0:1,2:5,0:1;1:2,2:1,0:1,2:1,1:1,2:2,0:4,3:1,0:1,2:1,1:2,2:1,0:1,2:1,1:1,2:3,0:1,2:2,1:1,2:2,0:1,3:1;2:2,0:1,3:1,0:1,2:1,0:1,2:3,0:1,2:1,0:1,2:4,0:1,2:1,1:2,2:1,1:2,2:1,1:2,2:2,0:1,3:2;0:2,2:1,0:1,3:1,0:5,2:1,1:1,2:2,1:1,2:3,1:1,2:2,1:1,2:1,1:3,2:1,0:2,3:1,0:2;0:1,2:1,0:1,3:1,4:1,3:1,0:1,3:2,0:1,2:3,0:1,2:2,1:2,2:1,0:2,2:1,1:3,2:1,0:1,2:1,0:3,2:1;0:1,2:1,0:2,3:1,0:4,2:1,1:1,2:1,1:1,2:1,1:1,2:1,1:2,2:1,0:3,2:5,0:2,3:1,0:2;2:1,0:1,3:1,0:1,3:1,0:1,2:1,0:1,2:1,0:1,2:1,0:1,2:1,0:1,2:1,1:2,2:1,0:1,3:2,0:7,3:1,0:1,3:1,0:1;0:1,3:1,0:3,2:1,1:1,2:3,1:1,2:2,0:1,2:3,1:1,2:1,0:2,2:2,0:1,3:1,0:1,2:1,0:3,3:1,0:1;3:1,0:1,2:2,0:1,2:3,1:3,2:1,0:1,2:1,0:2,2:1,1:1,2:4,0:3,2:1,1:1,2:2,0:1,3:1,0:1;3:2,0:2,2:1,1:1,2:2,1:2,2:1,0:2,2:1,0:1,2:1,1:1,2:1,1:1,2:2,1:1,2:1,0:1,2:3,1:1,2:1,0:2,2:1;3:1,0:2,2:1,1:1,2:1,1:2,2:1,1:1,2:3,1:1,2:5,1:3,2:1,0:4,2:3,0:2;4:1,3:2,0:1,2:4,1:6,2:1,0:1,2:1,0:1,2:1,1:2,2:2,0:1,3:3,0:1,2:1,1:1,2:1,0:1;3:2,0:1,2:1,0:2,2:2,1:1,2:3,1:1,2:2,0:1,2:2,1:2,2:1,1:2,2:1,0:1,3:1,0:1,2:1,1:1,2:2,0:1;0:2,2:1,1:1,2:2,1:2,2:1,0:1,2:1,1:1,2:1,1:2,2:1,1:1,2:3,0:1,2:1,1:1,2:2,0:1,2:1,1:1,2:1,0:2,3:1;0:2,2:1,1:3,2:2,0:1,2:1,1:1,2:2,1:2,2:1,1:3,2:2,0:1,2:1,1:2,2:1,1:1,2:1,1:1,2:2,0:1;0:1,2:1,1:1,2:4,1:1,2:3,0:2,2:3,1:2,2:1,0:1,2:1,0:2,2:2,1:1,2:1,0:1,2:1,0:2,2:1;0:2,2:1,1:4,2:2,0:3,3:1,0:2,2:1,1:1,2:1,0:1,3:1,0:1,2:3,1:1,2:1,0:1,3:1,0:1,3:2,0:1;3:1,0:1,2:6,0:1,2:1,0:1,2:1,0:1,2:2,1:2,2:1,0:2,2:2,0:2,2:1,0:1,3:1,4:1,3:1,4:2,3:1;3:1,0:1,2:2,0:3,2:2,0:1,3:1,0:3,2:3,0:1,2:2,0:2,3:2,0:2,3:4,4:2;0:2,2:1,0:1,3:2,0:2,2:2,0:1,2:1,0:2,2:1,0:1,2:1,0:3,3:1,0:1,3:1,0:1,3:2,0:2,3:1,4:1,3:1,4:1;0:1,3:1,0:1,3:1,4:1,3:1,0:4,2:1,1:1,2:4,0:2,3:1,0:2,2:1,0:1,3:3,0:2,3:2,0:1,3:1;3:1,4:1,3:2,4:1,3:1,0:2,2:3,1:1,2:1,0:1,2:3,0:3,2:1,1:1,2:1,0:1,3:6,0:1,3:1;4:4,3:4,0:2,2:2,0:1,3:1,0:2,2:2,0:1,3:1,0:1,2:1,0:1,3:1,0:1,3:1,4:2,3:4;4:7,3:1,0:1,3:1,0:3,3:3,0:1,2:1,0:4,3:1,4:1,3:2,4:6;4:2,3:1,4:5,3:1,0:2,3:4,4:1,3:1,0:1,3:3,0:2,3:1,4:2,3:1,4:5;4:1,3:1,4:1,3:1,4:2,3:1,4:2,3:2,4:1,3:1,4:3,3:2,0:1,3:1,0:2,3:1,4:1,3:2,4:2,3:1,4:3;3:3,0:1,3:2,0:1,3:1,4:2,3:1,4:1,3:3,4:2,3:1,0:2,3:2,4:4,3:2,0:1,3:3")

export const mapState = atom({
    key: 'mapState',
    default: field
})