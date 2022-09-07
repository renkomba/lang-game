export const drawMap = (ctx, src='', coordinates=[]) => {
    let map = new Image();
    let [x, y] = coordinates;
    map.src = src;
    map.onload = () => ctx.drawImage( map, -x * 16, -y * 16 );
}

export const drawChar = (
    ctx, 
    src='', 
    cutFrom=[], 
    cutSize=[], 
    coordinates=[], 
    size=[]
) => {
    let char = new Image();
    let [x, y] = coordinates;
    char.src = src;
    char.onload = () => ctx.drawImage(
        char,
        cutFrom[0], cutFrom[1],
        cutSize[0], cutSize[1],
        x * 16, y * 16,
        size[0], size[1]
    );
}