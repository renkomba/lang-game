import { 
    useCallback, 
    useEffect, 
    useRef, 
    useState 
} from "react";

import { connect } from "react-redux";
import CanvasContext from "../../contexts/CanvasContext";
import { move } from "../../slices/characterSlice";
import { checkMapCollision } from "../../functions/utils";

import {
    MAP_DIMENSIONS,
    MOVE_DIRECTIONS,
    TILE_SIZE
} from "../../constants/mapConstants";

const mapDispatch = { move };
const mapStateToProps = ({character}) => ({character});

const GameLoop = ({ children=[], character={}, move }) => {
    // STATES
    const [ctx, setCtx] = useState(null);
    const [isVisible, setIsVisible] = useState(true); 
    const [needsUpdate, setNeedsUpdate] = useState(false); 

    // REFS
    const canvasRef = useRef(null);
    const loopRef = useRef(null);

    // useCallback hooks
    const moveChar = useCallback( 
        ({key}) => {
            if (MOVE_DIRECTIONS[key]) {
                let [x, y] = MOVE_DIRECTIONS[key];
                if (!checkMapCollision(
                    character.x + x,
                    character.y + y
                )) {
                    setNeedsUpdate(true);
                    move([x, y]);
                }
            }
        }, [move, character.x, character.y]
    );

    const tick = useCallback(
        () => {
            if (needsUpdate) {
                setIsVisible(false);
                setIsVisible(true);
                setNeedsUpdate(false)
            }
            loopRef.current = requestAnimationFrame(tick);
        }, [needsUpdate, setIsVisible, setNeedsUpdate]
    );

    // useEffect hooks
    useEffect(
        () => setCtx(canvasRef.current.getContext('2d')), 
        [setCtx]
    );

    useEffect(
        () => {
            loopRef.current = requestAnimationFrame(tick);
            return () => loopRef.current && cancelAnimationFrame(loopRef.current);
        }, [loopRef, tick]
    );
    
    useEffect(
        () => {
            document.addEventListener('keydown', moveChar);
            return () => document.removeEventListener('keydown', moveChar);
        }, [moveChar]
    );

    // VARIABLES
    const [width, height] = [
        MAP_DIMENSIONS.COLS * TILE_SIZE,
        MAP_DIMENSIONS.ROWS * TILE_SIZE
    ];

    return (
        <CanvasContext.Provider value={ctx}>
            <canvas ref={canvasRef}
                height={height}
                width={width}
            />
            {isVisible && children}
        </CanvasContext.Provider>
    );
}

export default connect(mapStateToProps, mapDispatch)(GameLoop);