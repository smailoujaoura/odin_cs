function iterativeFibs(length) {
	if (length === 0) return [];
	if (length === 1) return [0];
	const fibs = [];
	fibs[0] = 0;
	fibs[1] = 1;
	for (let i = 2; i < length; i++) {
		fibs[i] = fibs[i-1] + fibs[i-2];
	}
	return fibs;
}
// console.log("8 Fib Numbers using iterative approach: ");
// console.table( iterativeFibs(8));

function fibs(len) {
	if (len <= 2) {
		return len === 0? [] : len === 1 ? [0] : [0, 1];
	}
	const seq = fibs(len-1);
	seq.push(seq[seq.length-1] + seq[seq.length-2]);
	return seq;
}
console.table(fibs(8));