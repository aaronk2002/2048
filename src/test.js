  const test = [2,0,0,2]
  const moveAny = (list) => {
    // Given a row or column, return the result of
    // performing a move towards the zero index.
    let ix = 0, jx = 0, newList = [0,0,0,0];
    while (jx < 4) {
      if (list[jx] === 0) {
        jx += 1;
        continue;
      }
      if (newList[ix] === 0) {
        newList[ix] = list[jx];
      }
      else {
        if (newList[ix] === list[jx]) {
          newList[ix] *= 2;
          ix += 1
        }
        else {
          ix += 1
          newList[ix] = list[jx];
        }
      }
      jx += 1
    }
    return newList
  };
  console.log(moveAny(test));