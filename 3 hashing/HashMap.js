import safeArray from "./SafeArray.js";
import LinkedList from "./LinkedList.js";

export class HashMap {
	constructor(loadFactor, capacity) {
		this.loadFactor = loadFactor ?? 0.75;
		this.capacity = capacity ?? 16;
		this.size = 0;
		this.array = safeArray(new Array(this.capacity).fill(null));
	}

	static hash(key) {
		let hashCode = 0;
		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) | 0;
		}
		return hashCode;
	}

	set(key, value) {
		const hashCode = Math.abs(HashMap.hash(key));
		const index = hashCode % this.capacity;
		
		let bucket = this.array[index];
		if (!bucket) {
			bucket = new LinkedList();
			this.array[index] = bucket;
		}
		let current = bucket.head();
		while (current) {
			if (current.value.key === key) {
				current.value.value = value;
				return;
			}
			current = current.next;
		}
		bucket.append({key, value});
		this.size++;

		if (this.size > this.capacity * this.loadFactor) {
			this.resize();
		}
	}

	resize() {
		const oldArray = this.array;
		this.capacity *= 2;
		this.array = safeArray(new Array(this.capacity).fill(null));

		// reinsert
		for (const bucket of oldArray) {
			if (!bucket)
				continue;
			let current = bucket.head();
			while (current) {
				const {key, value} = current.value;
				const hashCode = Math.abs(HashMap.hash(key));
				const newIndex = hashCode % this.capacity;

				if (!this.array[newIndex]) {
					this.array[newIndex] = new LinkedList();
				}
				this.array[newIndex].append({key, value});
				current = current.next;
			}
		}
	}

	get(key) {
		const hashCode = Math.abs(HashMap.hash(key));
		const index = hashCode % this.capacity;

		let bucket = this.array[index];
		if (bucket) {
			let current = bucket.head();
			while (current) {
				if (current.value.key === key) {
					return current.value.value;
				}
				current = current.next;
			}
		}
		return null;
	}

	has(key) {
		return this.get(key) !== null;
	}

	remove(key) {
		const hashCode = Math.abs(HashMap.hash(key));
		const index = hashCode % this.capacity;

		let bucket = this.array[index];
		if (!bucket)
			return false;
		
		let current = bucket.head();
		let i = 0;
		while (current) {
			if (current.value.key === key) {
				bucket.removeAt(i);
				return true;
			}
			current = current.next;
			i++;
		}
		return false;
	}

	length() {
		// let total = 0;
		// for (let i = 0; i < this.array.length; i++) {
		// 	const bucket = this.array[i];
		// 	if (bucket) {
		// 		total += bucket.size();
		// 	}
		// }
		// return total;
		return this.size;
	}

	clear() {
		this.capacity = 16;
		this.array = safeArray(new Array(this.capacity).fill(null));
		this.size = 0;
	}

	keys() {
		const allKeys = [];
		for (let i = 0; i < this.array.length; i++) {
			const bucket = this.array[i];
			if (bucket) {
				let current = bucket.head();
				while (current) {
					allKeys.push(current.value.key);
					current = current.next;
				}
			}
		}
		return allKeys;
	}

	values() {
		const allValues = [];
		for (let i = 0; i < this.array.length; i++) {
			const bucket = this.array[i];
			if (bucket) {
				let current = bucket.head();
				while (current) {
					allValues.push(current.value.value);
					current = current.next;
				}
			}
		}
		return allValues;
	}

	entries() {
		const allEntries = [];
		for (let i = 0; i < this.array.length; i++) {
			const bucket = this.array[i];
			if (bucket) {
				let current = bucket.head();
				while (current) {
					allEntries.push([current.value.key, current.value.value]);
					current = current.next;
				}
			}
		}
		return allEntries;
	}
};