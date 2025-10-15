import Node from "./Node.js";
import LinkedList from "../2 lists/LinkedList.js";

export default class Tree {
	constructor() {
		this.root = null;
	}

	static prettyPrint(node, prefix = '', isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			Tree.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			Tree.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}

	}

	static height(node) {
		if (node) {
			return node.height;
		}
		return 0;
	}

	static maxHeight(left, right) {
		return Math.max(Tree.height(left), Tree.height(right))
	}

	rotateRight(root) {
		const newRoot = root.left;

		root.left = newRoot.right;
		newRoot.right = root;

		root.height = Tree.maxHeight(root.left, root.right) + 1;
		newRoot.height = Tree.maxHeight(newRoot.left, newRoot.right) + 1;

		return newRoot;
	}

	rotateLeft(root) {
		const newRoot = root.right;

		root.right = newRoot.left;
		newRoot.left = root;

		root.height = Tree.maxHeight(root.left, root.right) + 1;
		newRoot.height = Tree.maxHeight(newRoot.left, newRoot.right) + 1;

		return newRoot;
	}

	#insert(root, value) {
		if (root === null) {
			root = new Node(value);
			return root;
		}
		if (value <= root.data) {
			root.left = this.#insert(root.left, value);
		} else {
			root.right = this.#insert(root.right, value);
		}

		const balanceDelta = Tree.height(root.left) - Tree.height(root.right);
		if (balanceDelta > 1) {
			if (Tree.height(root.left.left) >= Tree.height(root.left.right)) {
				return rotateRight(root);
			} else {
				root.left = rotateLeft(root.left);
				return rotateRight(root);
			}
		} else if (balanceDelta < -1) {
			if (Tree.height(root.right.right) >= Tree.height(root.right.left)) {
				return this.rotateLeft(root);
			} else {
				root.right = rotateRight(root.right);
				return this.rotateLeft(root);
			}
		}
		root.height = 1 + Tree.maxHeight(root.left, root.right);
		return root;
	}

	insert(value) {
		this.root = this.#insert(this.root, value);
	}

	insertArray(array) {
		array.forEach(element => {
			this.insert(element);	
		});
	}

	delete(value) {
		// to heavy tobe doing this tonight
	}
	height(value) {
		const node = this.find(value);
		if (node) {
			return node.height - 1;
		}
		return null;
	}
	depth(value) {
		// let ptr = this.root;
		// let depth = 0;
		// while (ptr) {
		// 	if (value < ptr.data) {
		// 		ptr = ptr.left;
		// 		depth++;
		// 	} else if (value > ptr.data) {
		// 		ptr = ptr.right;
		// 		depth++;
		// 	} else {
		// 		return depth;
		// 	}
		// }
		// return null;
		let ptr = this.root;
		let depth = 0;
		while (ptr !== null) {
			if (value === ptr.data) {
				return depth;
			}
			ptr = value < ptr.data ? ptr.left : ptr.right;
			depth++;
		}
		return null;
	}

	find(value) {
		let ptr = this.root;
		while (ptr) {
			if (value < ptr.data) {
				ptr = ptr.left; 
			} else if (value > ptr.data) {
				ptr = ptr.right;
			} else {
				return ptr;
			}
		}
		return null;
	}

	isBalanced() {
		return true;
		// always balanced for it is self balancing as it is an AVL tree
	}

	#inOrder(root, callback) {
		if (root === null) {
			return ;
		}
		this.#inOrder(root.left, callback);
		callback(root.data);
		this.#inOrder(root.right, callback);
	}
	inOrderForEach(callback) {
		if (typeof callback !== "function") {
			throw new Error("Callback must be a function");
		}
		this.#inOrder(this.root, callback);
	}

	#postOrder(root, callback) {
		if (root === null) {
			return;
		}
		this.#postOrder(root.left, callback);
		this.#postOrder(root.right, callback);
		callback(root.data);
	}
	postOrderForEach(callback) {
		if (typeof callback !== "function") {
			throw new Error("Callback must be a function");
		}
		this.#postOrder(this.root, callback);
	}

	#preOrder(callback) {
		if (root === null) {
			return;
		}
		callback(root.data);
		this.#preOrder(root.left, callback);
		this.#preOrder(root.right, callback);
	}
	preOrderForEach(callback) {
		if (typeof callback !== "function") {
			throw new Error("Callback must be a function");
		}
		this.#preOrder(this.root, callback);
	}

	iterativeLevelTraversal(callback) {
		const queue = new LinkedList();
		if (this.root) {
			queue.enqueue(this.root);
		}
		
		while (queue.size() > 0) {
			const node = queue.dequeue();

			callback(node);
			if (node.left) {
				queue.append(node.left);
			}
			if (node.right) {
				queue.append(node.right);
			}
		}
	}
	recursiveLevelTraversal(queue, callback) {
		if (queue.size() === 0) {
			return;
		}
		
		const nextLevel = new LinkedList();
		for (const node of queue) {
			callback(node);
			if (node.left) {
				nextLevel.enqueue(node.left);
			}
			if (node.right) {
				nextLevel.enqueue(node.right);
			}
		}

		this.recursiveLevelTraversal(nextLevel, callback);
	}
	levelOrderForEach(callback) {
		if (typeof callback !== "function") {
			throw new Error("Callback must be a function");
		}
		this.iterativeLevelTraversal(callback);
		// const queue = new LinkedList();
		// if (this.root) {
		// 	queue.enqueue(this.root);
		// }
		// this.recursiveLevelTraversal(queue, callback);
	}
}