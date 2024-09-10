const bubbleSort = (array, setArray, speed) => {
    let arr = [...array];
    let animations = [];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push([j, j+1]); // Comparison indices
        if (arr[j] > arr[j + 1]) {
          animations.push([j, arr[j + 1], j + 1, arr[j]]); // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    animateArray(animations, setArray, speed);
  };
  
  const animateArray = (animations, setArray, speed) => {
    animations.forEach((animation, i) => {
      setTimeout(() => {
        // Update the array or highlight the bars being compared/swapped
        if (animation.length === 2) {
          highlightBars(animation[0], animation[1]); // Highlight bars being compared
        } else {
          setArray((prev) => {
            const newArray = [...prev];
            newArray[animation[0]] = animation[1];
            newArray[animation[2]] = animation[3];
            return newArray;
          });
        }
      }, i * speed);
    });
  };
  