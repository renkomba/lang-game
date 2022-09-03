// import logo from './logo.svg';
import './App.css';
import Grid from './components/Grid/Grid';
import { useEffect, useRef, useState } from 'react';
import CanvasContext from './contexts/CanvasContext';

function App() {
  const [ctx, setCtx] = useState(null);
  // const CanvasContext = useContext(CanvasContext);
  const canvasRef = useRef(null);

  useEffect(
    () => {
      setCtx(canvasRef.current.getContext('2d'));
      // canvasRef.current.height = 198;
      // canvasRef.current.width = 352;
      console.log(canvasRef);
    },
    [setCtx]
  );

  const [ width, height ] = [ 352, 198 ];

  return (
    <main className="App">
      <CanvasContext.Provider value={ctx}>
        <div>
          <canvas
            ref={canvasRef}
            height={height}
            width={width}
          />
          <Grid 
            height={height}
            width={width}
            tileSize={64}
          />
        </div>
      </CanvasContext.Provider>
    </main>
  );
}

export default App;