import Node from "./Node.js"

export default class LinkedList {
	constructor() {
		this._root = null;
		this._tail = null;
		this._size = 0;
	}
	
	append(value) {
		const newNode = new Node(value);
		if (!this._root) {
			this._root = newNode;
		} else {
			this._tail.next = newNode;
		}
		this._tail = newNode;
		this._size++;
	}

	prepend(value) {
		const newNode = new Node(value);
		if (this._root) {
			newNode.next = this._root;
			this._root = newNode;
		} else {
			this._tail = newNode;
		}
		this._root = newNode;
		this._size++;
	}

	size() {
		return this._size;
	}

	head() {
		return this._root;
	}

	tail() {
		return this._tail;
	}

	at(index) {
		if (index < 0 || index >= this._size)
			return null;
		let i = 0;
		let ptr = this._root;
		while (ptr && i !== index) {
			ptr = ptr.next;
			i++;
		}
		return ptr;
	}

	pop() {
		if (this._size === 0) {
			return;
		} else if (this._size === 1) {
			this._root = null;
			this._tail = null;
		} else {
			let ptr = this._root;
			while (ptr && ptr.next !== this._tail) {
				ptr = ptr.next;
			}
			ptr.next = null;
			this._tail = ptr;
		}
		this._size--;
	}

	contains(value) {
		let ptr = this._root;
		while (ptr) {
			if (ptr.value === value) {
				return true;
			}
			ptr = ptr.next;
		}
		return false;
	}

	find(value) {
		let ptr = this._root;
		let foundAt = 0;
		while (ptr) {
			if (ptr.value == value) {
				return foundAt;
			}
			ptr = ptr.next;
			foundAt++;
		}
		return null;
	}

	toString() {
		let ptr = this._root;
		let str = "";
		while (ptr) {
			str += `( ${ptr.value} ) -> `;
			ptr = ptr.next;
		}
		str += `null`;
		return str;
	}

	insertAt(value, index) {
		if (index <= 0) {
			this.prepend(value);
		}
		else if (index >= this._size) {
			this.append(value);
		} else {
			let i = 0;
			let ptr = this._root;
			while (i < index - 1) {
				ptr = ptr.next;
				i++;
			}
			const newNode = new Node(value);
			newNode.next = ptr.next;
			ptr.next = newNode;
			this._size++;
		}
	}

	removeAt(index) {
		if (index < 0 || index > this._size) {
			return;
		} 
		let i = 0;
		let ptr = this._root;
		while (i !== index) {
			i++;
			ptr = ptr.next;
		}
		if (ptr === this._tail) {
			this.pop();
		}
		else if (ptr === this._root) {
			this._root = ptr.next;
			this._size--;
		} else {
			const prev = this.at(index-1);
			prev.next = ptr.next;
			this._size--;
		}
	}
}

