//this function for additional styling for the photo list

export function addPhotos(column1, column2, column3, column4, data) {
    const newColumn1 = [...column1];
    const newColumn2 = [...column2];
    const newColumn3 = [...column3];
    const newColumn4 = [...column4];

    const dataCopy = [...data];
    
    if (newColumn2.length < newColumn1.length) {
        newColumn2.push(dataCopy.shift());
        newColumn3.push(dataCopy.shift());
        newColumn4.push(dataCopy.shift());
    } else if (newColumn3.length < newColumn1.length) {
        newColumn3.push(dataCopy.shift());
        newColumn4.push(dataCopy.shift());
    } else if (newColumn4.length < newColumn1.length) {
        newColumn4.push(dataCopy.shift());
    } 
  
    data.forEach((item, index) => {
      if (index % 4 === 0) newColumn1.push(item);
      if (index % 4 === 1) newColumn2.push(item);
      if (index % 4 === 2) newColumn3.push(item);
      if (index % 4 === 3) newColumn4.push(item);
    });
  
    return { newColumn1, newColumn2, newColumn3, newColumn4 };
  }
  