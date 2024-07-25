export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]); // Compare
    animations.push([i, j]); // Unhighlight
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]); // Write
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]); // Write
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]); // Compare
    animations.push([i, i]); // Unhighlight
    animations.push([k, auxiliaryArray[i]]); // Write
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]); // Compare
    animations.push([j, j]); // Unhighlight
    animations.push([k, auxiliaryArray[j]]); // Write
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getBubbleSortAnimations(array) {
  const animations = [];
  const auxArray = array.slice();
  for (let i = 0; i < auxArray.length - 1; i++) {
    for (let j = 0; j < auxArray.length - i - 1; j++) {
      animations.push([j, j + 1]); // Compare
      if (auxArray[j] > auxArray[j + 1]) {
        animations.push([j, j + 1, auxArray[j + 1], auxArray[j]]); // Swap
        const temp = auxArray[j];
        auxArray[j] = auxArray[j + 1];
        auxArray[j + 1] = temp;
      }
      animations.push([j, j + 1]); // Unhighlight
    }
  }
  return animations;
}

export function getQuickSortAnimations(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    const pivotIdx = partition(array, startIdx, endIdx, animations);
    quickSortHelper(array, startIdx, pivotIdx - 1, animations);
    quickSortHelper(array, pivotIdx + 1, endIdx, animations);
  }
}

function partition(array, startIdx, endIdx, animations) {
  const pivotValue = array[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push([i, endIdx]); // Compare with pivot
    if (array[i] < pivotValue) {
      animations.push([i, pivotIdx, array[pivotIdx], array[i]]); // Swap
      const temp = array[i];
      array[i] = array[pivotIdx];
      array[pivotIdx] = temp;
      pivotIdx++;
    }
    animations.push([i, endIdx]); // Unhighlight
  }
  animations.push([pivotIdx, endIdx, array[endIdx], array[pivotIdx]]); // Final swap with pivot
  const temp = array[pivotIdx];
  array[pivotIdx] = array[endIdx];
  array[endIdx] = temp;
  return pivotIdx;
}
export function getInsertionSortAnimations(array) {
  const animations = [];
  const auxArray = array.slice();
  for (let i = 1; i < auxArray.length; i++) {
    let j = i;
    while (j > 0 && auxArray[j] < auxArray[j - 1]) {
      animations.push([j, j - 1]); // Compare
      animations.push([j, j - 1, auxArray[j], auxArray[j - 1]]); // Swap
      const temp = auxArray[j];
      auxArray[j] = auxArray[j - 1];
      auxArray[j - 1] = temp;
      animations.push([j, j - 1]); // Unhighlight
      j--;
    }
  }
  return animations;
}

export function getSelectionSortAnimations(array) {
  const animations = [];
  const auxArray = array.slice();
  for (let i = 0; i < auxArray.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < auxArray.length; j++) {
      animations.push([i, j]); // Compare
      if (auxArray[j] < auxArray[minIdx]) {
        minIdx = j;
      }
      animations.push([i, j]); // Unhighlight
    }
    if (minIdx !== i) {
      animations.push([i, minIdx, auxArray[minIdx], auxArray[i]]); // Swap
      const temp = auxArray[i];
      auxArray[i] = auxArray[minIdx];
      auxArray[minIdx] = temp;
    }
  }
  return animations;
}