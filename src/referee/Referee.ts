import { PieceType, TeamType } from "../components/Chessboard/Chessboard";

export default class Referee{
    isValidMove(px: number,py:number,x:number,y:number,type:PieceType){
    console.log("refree is here")
    console.log(`previous location: (${px},${py})`);
    console.log(`New location: (${x},${y})`);
    console.log(`piece type: (${type})`);

    if(type===PieceType.PWAN){

    }
    return true;
}
}