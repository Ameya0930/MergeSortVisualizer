import React from 'react';
import './SortingVisualizer.css';
import { 
  getMergeSortAnimations, 
  getBubbleSortAnimations, 
  getQuickSortAnimations, 
  getInsertionSortAnimations, 
  getSelectionSortAnimations 
} from '../SortingAlgorithms/SortingAlgorithms.js';

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 365;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'black';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    this.animateSorting(animations, 3);
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    this.animateSorting(animations, 4);
  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    this.animateSorting(animations, 4);
  }

  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    this.animateSorting(animations, 3);
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);
    this.animateSorting(animations, 4);
  }

  animateSorting(animations, step) {
    const arrayBars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % step !== step - 1;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        if (barOneIdx >= arrayBars.length || barTwoIdx >= arrayBars.length) {
          console.error(`Invalid index: ${barOneIdx}, ${barTwoIdx}`);
          continue;
        }
        const barOneStyle = arrayBars[barOneIdx]?.style;
        const barTwoStyle = arrayBars[barTwoIdx]?.style;
        const color = i % step === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (barOneStyle && barTwoStyle) {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          if (barOneIdx >= arrayBars.length) {
            console.error(`Invalid index: ${barOneIdx}`);
            return;
          }
          const barStyle = arrayBars[barOneIdx]?.style;
          if (barStyle) {
            barStyle.height = `${newHeight}px`;
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        <div className="array-bar-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
              }}></div>
          ))}
        </div>
        <div className="button-container">
          <button onClick={() => this.resetArray()} className="generate-button">Generate New Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.insertionSort()}>Insertion Sort</button>
          <button onClick={() => this.selectionSort()}>Selection Sort</button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) return false;
  }
  return true;
}
