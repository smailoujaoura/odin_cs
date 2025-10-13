
export default function safeArray(arr) {
	return new Proxy(arr, {
		get(target, prop) {
			if (typeof prop === "symbol") {
				return target[prop];
			}
			const index = Number(prop);
			if (!isNaN(index)) {
				if (index < 0 || index >= target.length) {
					throw new Error(`Index ${index} out of bounds`);
				}
			}
			return target[prop];
		},
		set(target, prop, value) {
			if (typeof prop === "symbol") {
				target[prop] = value;
				return true;
			}
			const index = Number(prop);
			if (!isNaN(index)) {
				if (index < 0 || index >= target.length) {
					throw new Error(`Index ${index} out of bounds`);
				}
			}
			target[prop] = value;
			return true;
		}
	});
}