// export class Node {
// 	constructor(value = null, nextNode = null) {
// 		this.value = value;
// 		this.nextNode = nextNode;
// 	}

// 	setValue(value) {
// 		this.value = value;
// 	}

// 	setNextNode(nextNode) {
// 		this.nextNode = nextNode;
// 	}
// }

// export function Node() {

// 	let value = null;
// 	let nextNode = null;

// 	return {
// 		value: null,
// 		nextNode: null,
// 		setValue: (value) => {
// 			value = value;
// 		},
// 		setNextNode: (nextNode) => {
// 			nextNode = nextNode;
// 		}
// 	}
// }

export default class Node {
	constructor(value = null) {
		this.value = value;
		this.nextNode = null;
	}
}

// export function Node(value = null, nextNode = null) {
// 	return {
// 		value,
// 		nextNode
// 	};
// }