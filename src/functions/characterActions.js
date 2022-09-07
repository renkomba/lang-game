import { getRandomNum } from "./getRandoms";

// ARRAYS
const actions = ['cast', 'thrust', 'walk', 'slash', 'fall'];
const directions = ['up', 'right', 'down', 'left'];

// FUNCTIONS
export const face = (direction='') => {
    return directions.includes(direction) ? direction 
        : directions[getRandomNum(directions.length)]
}

export const act = (action='') => {
    return actions.includes(action) ? action
        : actions[getRandomNum(actions.length)]
}