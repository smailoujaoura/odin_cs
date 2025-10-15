// class GraphNode {
// 	constructor(value) {
// 		this.value = value;
// 		this.neighbors = new Set();
// 	}
// }

// export default class Graph {
// 	constructor() {
// 		this.vertices = new Map();
// 	}

// 	addVertex(value) {
// 		if (!this.vertices.has(value)) {
// 			this.vertices.set(value, new GraphNode(value));
// 		}
// 	}

// 	addEdge(v1, v2) {
// 		const node1 = this.vertices.get(v1);
// 		const node2 = this.vertices.get(v2);
// 		if (!node1 || !node2) {
// 			return;
// 		}
// 		node1.neighbors.add(node2);
// 		node2.neighbors.add(node1);
// 	}
// }

