// This function performs the merge sort algorithm on an input array.
export default function mergeSort(arr) {
  // If the array has one or fewer elements, it's already sorted, so we return it.
  if (arr.length <= 1) return arr;

  // Calculate the middle index of the array.
  const middle = Math.floor(arr.length / 2);

  // Split the array into two halves: left and right.
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Recursively merge, sort the left and right halves, and return the result.
  return merge(mergeSort(left), mergeSort(right));
}

// This function merges two sorted arrays into a single sorted array.

function merge(left, right) {
  // Initialize an empty result array and indices for left and right arrays.
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements from both arrays and add the smaller element to the result.
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Concatenate the remaining elements from both arrays (if any) to the result.
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

//(c)https://blog.logrocket.com/choosing-javascript-sorting-algorithm/
