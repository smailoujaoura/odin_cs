function mergeArrays(one, two) {
	const sortedArray = [];
	let i = 0;
	let j = 0;
	while (i < one.length && j < two.length) {
		if (one[i] <= two[j]) {
			sortedArray.push(one[i++])
		} else {
			sortedArray.push(two[j++]);
		}
	}
	while (i < one.length) {
		sortedArray.push(one[i++]);
	}
	while (j < two.length) {
		sortedArray.push(two[j++]);
	}
	return sortedArray;
}

function mergeSort(array) {
	if (array.length <= 1) {
		return array;
	}
	// divide and conquer
	// divide into smaller sub arrays until hitting the base case abvoe
	const midIndex = Math.floor(array.length / 2);
	console.log(midIndex);
	const halfOne = mergeSort(array.slice(0, midIndex));
	const halfTwo = mergeSort(array.slice(midIndex));
	// conquer by merging back building the sorted array
	return mergeArrays(halfOne, halfTwo);
}

console.log(mergeSort([]));
console.log(mergeSort([73]));
console.log(mergeSort([1,2,3,4,5]));
console.log(mergeSort([3,2,1,13,8,5,0,1]));
console.log(mergeSort([105,79,100,110]));