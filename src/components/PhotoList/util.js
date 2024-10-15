//this function for additional styling for the photo list

export function appendPhotos(prevPhotos, data, columnCount) {
    if(data === undefined || data === null || data.length === 0) {
        return prevPhotos;
    }

    if(columnCount === 1) {
        return prevPhotos.concat(data);
    }
  
    var oldListCount = prevPhotos.length;
    var dataListCount = data.length;

    const oldRemaining = oldListCount % columnCount;

    if(oldRemaining !== 0) {
        for (let i = 0; i < columnCount - oldRemaining; i++) {
            prevPhotos.push(data[i]);
            oldListCount++;
            data.shift();
        }
    }

    const firstColumn = prevPhotos.slice(0, oldListCount / columnCount);
    const secondColumn = prevPhotos.slice(oldListCount / columnCount, oldListCount / columnCount * 2);
    const thirdColumn = prevPhotos.slice(oldListCount / columnCount * 2, oldListCount / columnCount * 3);

    for(let i = 0; i < dataListCount; ) {
        firstColumn.push(data[i]);
        i++;
        if(i === dataListCount) break;
        secondColumn.push(data[i]);
        i++;
        if(i === dataListCount) break;
        thirdColumn.push(data[i]);
        i++;
    }


    console.log( firstColumn.length, secondColumn.length, thirdColumn.length);

    const newPhotos = firstColumn.concat(secondColumn).concat(thirdColumn);

    return newPhotos;
}