import React, { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { motion } from 'framer-motion';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [unsortedArray, setUnsortedArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const MAX_VALUE = 500; // Set the maximum value for scaling

  // Generates new random array with values between 5 and MAX_VALUE
  const generateArray = (size = 50) => {
    const newArr = Array.from({ length: size }, () => Math.floor(Math.random() * (MAX_VALUE - 5)) + 5);
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
          const swapHeight = arrayBars[j].style.height;

          arrayBars[i].style.height = swapHeight;
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

  // Generate Y-axis values dynamically based on the max height (MAX_VALUE)
  const yAxisLabels = () => {
    const interval = Math.ceil(MAX_VALUE / 10); // Divide the range into 10 intervals
    const labels = [];
    for (let i = MAX_VALUE; i >= 0; i -= interval) {
      labels.push(i);
    }
    return labels;
  };

  return (
    <div className="visualizer-container">
      {/* Y-Axis Labels */}
      <div className="y-axis">
        {yAxisLabels().map((label, idx) => (
          <div key={idx} className="y-axis-label">{label}</div>
        ))}
      </div>

      {/* Array Container */}
      <div className="array-container">
        {array.length > 0 ? (
          array.map((value, idx) => (
            <motion.div
              key={idx}
              className="array-bar"
              style={{ height: `${(value / MAX_VALUE) * 100}%` }} // Normalize height based on MAX_VALUE
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Show value on hover */}
              <span className="bar-value">{value}</span>
            </motion.div>
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

      <div className="button-container">
        <button onClick={() => generateArray()} disabled={isSorting}>Generate New Array</button>
        <button onClick={bubbleSort} disabled={isSorting}>Bubble Sort</button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
