import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { motion } from 'framer-motion';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [unsortedArray, setUnsortedArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  // Generates new random array
  const generateArray = (size = 50) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * 500));
    console.log('Generated array:', newArr);
    setArray([...newArr]);
    setUnsortedArray([...newArr]); // Save the unsorted array
    setSortedArray([]); // Clear the sorted array
    setIsSorting(false); // Reset sorting state
  };

  useEffect(() => {
    generateArray(); // Generate an array when the component first mounts
  }, []);

  const bubbleSort = () => {
    let arr = [...array];
    const animations = [];
    setIsSorting(true);

    // Bubble sort logic
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        animations.push([j, j + 1, 'compare']);
        if (arr[j] > arr[j + 1]) {
          animations.push([j, j + 1, 'swap']);
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }

    animateSort(animations, arr);
  };

  const animateSort = (animations, finalArray) => {
    animations.forEach(([i, j, type], index) => {
      setTimeout(() => {
        const arrayBars = document.getElementsByClassName('array-bar');
        if (type === 'compare') {
          arrayBars[i].style.backgroundColor = 'red';
          arrayBars[j].style.backgroundColor = 'red';
        } else if (type === 'swap') {
          const tempHeight = arrayBars[i].style.height;
          arrayBars[i].style.height = arrayBars[j].style.height;
          arrayBars[j].style.height = tempHeight;
        }
        setTimeout(() => {
          arrayBars[i].style.backgroundColor = 'lightblue';
          arrayBars[j].style.backgroundColor = 'lightblue';
        }, 100);
      }, index * 50); // Speed of animation
    });

    // Update sorted array after all animations are complete
    setTimeout(() => {
      setSortedArray([...finalArray]);
      setIsSorting(false);
    }, animations.length * 50);
  };

  return (
    <div>
      <div className="array-container">
        {array.length > 0 ? (
          array.map((value, idx) => (
            <motion.div
              key={idx}
              className="array-bar"
              style={{ height: `${value}px` }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              title={`Value: ${value}`} // Show value on hover
            ></motion.div>
          ))
        ) : (
          <p>No array to display</p>
        )}
      </div>

      <div className="array-info">
        <div className="info-box">
          <h3>Unsorted Array:</h3>
          <p>{unsortedArray.join(', ')}</p>
        </div>
        <div className="info-box">
          <h3>Sorted Array:</h3>
          <p>{sortedArray.join(', ')}</p>
        </div>
      </div>

      <button onClick={() => generateArray()} disabled={isSorting}>Generate New Array</button>
      <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
    </div>
  );
};

export default SortingVisualizer;
