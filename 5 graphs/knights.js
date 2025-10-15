function knightMoves(start, end) {
	if (start[0] === end[0] && start[1] === end[1]) {
		return [start];
	}

	const moves = [
		[2, 1], [2, -1], [-2, 1], [-2, -1],
		[1, 2], [1, -2], [-1, 2], [-1, -2]
	];
	const queue = [[start, [start]]];
	const visited = new Set([start.toString()]);
	while (queue.length) {
		const [pos, path] = queue.shift();
		const [x, y] = pos;
		for (const [dx, dy] of moves) {
			const nx = x + dx;
			const ny = y + dy;
			if (nx < 0 || nx > 7 || ny < 0 || ny > 7) {
				continue;
			}
			const next = [nx, ny];
			const key = next.toString();
			if (visited.has(key)) {
				continue;
			}
			const newPath = [...path, next];
			if (nx === end[0] && ny === end[1]) {
				return newPath;
			}
			visited.add(key);
			queue.push([next, newPath]);
		}
	}
}

console.log(knightMoves([0,0],[1,2]));
console.log(knightMoves([0,0],[3,3]));