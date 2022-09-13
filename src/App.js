// import logo from './logo.svg';
// import CanvasContext from './contexts/CanvasContext';
// import Canvas from './components/Canvas/Canvas';
// import Character from './components/Character/Character';
// import { act, face } from './functions/characterActions';
// import Grid from './components/Grid/Grid';
// import React from 'react';
import React, { useEffect, useRef, useState } from 'react';
import GameUI from './components/GameUI/GameUI';
import GameLoop from './components/GameLoop/GameLoop';
import TileView from './components/TileView/TileView';
import './App.css';
import Character from './character';
import { createContext } from 'react';

const hero = new Character({ role: 'main' });


// Too many rerenders
function App() {
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(null);
  const PlayerContext = createContext(
    new Character({ role: 'main' })
  );

  useEffect(
    () => {
      setCtx(canvasRef.current.getContext('2d'));
      // canvasRef.current.height = 198;
      // canvasRef.current.width = 352;

      if (ctx && hero) {
        let [ startX, startY ] = hero.cutFrom;
        let [ sizeX, sizeY ] = hero.cutSize;
        let [ locationX, locationY ] = hero.coordinates;
        ctx.drawImage(
          hero.src,
          startX, startY,
          sizeX, sizeY,
          locationX, locationY,
          hero.spriteSize, hero.spriteSize
        );
      }
      console.log(canvasRef);
    },
    [setCtx]
  );

  // const printKey = (e) => {
  //   console.log(e);
  // }
  console.log('APP.JS IS RENDERING');

  return (
    <>
      <header>GAME</header>
      <main className='game_content'>
        <img
          id='main_character'
          className='main_character'
          src={hero.src}
        />
      </main>
      <footer></footer>
    </>
  );
}

export default App;