import React, { useEffect, useRef, useState } from 'react'
import './../../style/Chessboard.css'
import Tile from '../Tile/Tile'
import Referee from  '../../referee/Referee'

const verticalAxis =["1","2","3","4","5","6","7","8"];
const horizantalAxis=["a","b","c","d","e","f","g","h"];
interface Piece{
  image:string;
  x: number;
  y: number;
  type: PieceType;
  team:TeamType;
}
export enum  PieceType{
PWAN,
BISHOP,
KNIGHT,
ROOK,
QUEEN,
KING
}
export enum TeamType{
  OPPONENT,
  OUR
}

//const pieces: Piece[]=[];
const initialBoardState:Piece[]=[];

for(let p=0;p<2;p++){
  const teamType= (p===0)? TeamType.OPPONENT:TeamType.OUR
  const type = (teamType===TeamType.OPPONENT)? "black":"white";
  const y= (teamType===TeamType.OPPONENT) ? 7 : 0;
  initialBoardState.push({image:`assets/rook-${type}.png`, x: 0,y,type:PieceType.ROOK,team:teamType});
  initialBoardState.push({image:`assets/rook-${type}.png`, x: 7,y,type:PieceType.ROOK,team:teamType});
  initialBoardState.push({image:`assets/knight-${type}.png`, x: 1,y,type:PieceType.KNIGHT,team:teamType});
  initialBoardState.push({image:`assets/knight-${type}.png`, x: 6,y,type:PieceType.KNIGHT,team:teamType});
  initialBoardState.push({image:`assets/bishop-${type}.png`, x: 2,y,type:PieceType.BISHOP,team:teamType});
  initialBoardState.push({image:`assets/bishop-${type}.png`, x: 5,y,type:PieceType.BISHOP,team:teamType});
  initialBoardState.push({image:`assets/queen-${type}.png`, x: 3,y,type:PieceType.QUEEN,team:teamType});
  initialBoardState.push({image:`assets/king-${type}.png`, x: 4,y,type:PieceType.KING,team:teamType});

}

for(let i=0; i<8; i++){
initialBoardState.push({image:"assets/pwan-black.png", x: i,y:6,type:PieceType.PWAN,team:teamType})
}

for(let i=0; i<8; i++){
  initialBoardState.push({image:"assets/pwan-white.png", x: i,y:1,type:PieceType.PWAN,team:teamType})
  }


 
export const Chessboard = () => {
  const [activePiece ,setActivePiece]=useState<HTMLElement | null>(null);
  const [gridX,setGridX]=useState(0);
  const[gridY,setGridY]=useState(0);
const [pieces,setPieces]=useState<Piece[]>(initialBoardState);

const referee= new Referee();
 const chessboardRef = useRef<HTMLDivElement >(null);
//  let activePiece:HTMLElement| null=null;

useEffect(()=>{})

 function grabPiece( e: React.MouseEvent){
  const chessboard=chessboardRef.current;
  const element=e.target as HTMLElement;
  if (element.classList.contains("chess-piece")&& chessboard){
   
  // console.log(e);
  setGridX(Math.floor((e.clientX- chessboard.offsetLeft)/100));
  setGridY(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop-800)/100)));
  const x= e.clientX -50;
  const y=e.clientY -50;
  element.style.position="absolute";
  element.style.left=`${x}px`;
  element.style.top=`${y}px`;
  setActivePiece(element);
  
  }

}

function movePiece(e: React.MouseEvent){
  const chessboard=chessboardRef.current;
  // const element=e.target as HTMLElement;
  if (activePiece && chessboard){
  // console.log(activePiece);

  const minX=chessboard.offsetLeft-25;
  const minY=chessboard.offsetTop-25;
  const maxX=chessboard.offsetLeft+chessboard.clientWidth-75;
  const maxY=chessboard.offsetTop+chessboard.clientHeight-75;
    const x= e.clientX -50;
    const y=e.clientY -50;

    activePiece.style.position="absolute";
    // activePiece.style.left=`${x}px`;
    // activePiece.style.top=`${y}px`;
    console.log(chessboard.offsetLeft);
    // if x is smaller than minimum amount
    if(x<minX){
    activePiece.style.left=`${minX}px`;
    //if x is bigger than maximum amount
    }else if(x>maxX){
      activePiece.style.left=`${maxX}px`;
    }
    //if x is the constraints
    else{
    activePiece.style.left=`${x}px`;
    }
       // if y is smaller than minimum amount
    if(x<minY){
      activePiece.style.left=`${minY}px`;
      }
    //if y is bigger than maximum amount
      else if(x>maxY){
        activePiece.style.left=`${maxY}px`;
      }
    //if y is the constraints
      else{
      activePiece.style.left=`${y}px`;
      }

    activePiece.style.left= x < minX  ?`${minX}px` : `${x}px`
    activePiece.style.top= y < minY ?`${minY}px`: `${y}px`

    
  }
}
function dropPiece(e:React.MouseEvent){
  const chessboard=chessboardRef.current;

  // console.log(e)
  if(activePiece && chessboard){
    const x=Math.floor((e.clientX- chessboard.offsetLeft)/100);
    const y=Math.abs(Math.ceil((e.clientY - chessboard.offsetTop-800)/100));
    //console.log(x,y);

    // update the piece position
    setPieces(value=>{
      const pieces=value.map(p=>{
        if(p.x === gridX && p.y === gridY){
          referee.isValidMove(gridX,gridY,x,y,p.type);

          p.x=x;
          p.y=y;
        }
        return p;
      })
      return pieces;
    });
    // pieces[0].x=5;

   setActivePiece(null);

  }

}


 let board=[];
 for(let j = verticalAxis.length-1; j>=0; j--){
  for (let i=0; i < horizantalAxis.length; i++){
    let image=undefined;
     const number =j+i+2;
    pieces.forEach(p=>{
      if(p.x===i && p.y===j){
        image= p.image;
      }
    });
    // "0,0"
    // "1,0"
    // "2,0"

     board.push(<Tile key={`${i},${j}`} image={image} number={number}/>)

    
      
    }
  }

  return <div 
  onMouseMove={(e)=> movePiece(e)} 
  onMouseDown={e => grabPiece(e)}
  onMouseUp={e=>dropPiece(e)}
   id="chessboard" 
   ref={chessboardRef}>
     {board} </div>;
  
}
