// const input: string = await Deno.readTextFile("./exampleInput.txt");
// const input: string = await Deno.readTextFile("./exampleInput2.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trimEnd()
	.split("\r\n");

console.log(splitInput);

type Coordinates = [number, number];

type Direction = "U" | "D" | "L" | "R";

type Positions = Coordinates[];

function moveKnot(currPositions: Positions, dir: Direction, knotIndex: number) {
	switch (dir) {
		case "U":
			currPositions[knotIndex][1]++;
			break;
		case "D":
			currPositions[knotIndex][1]--;
			break;
		case "L":
			currPositions[knotIndex][0]--;
			break;
		case "R":
		default:
			currPositions[knotIndex][0]++;
	}
}

function isInRadius(head: Coordinates, tail: Coordinates) {
	const [hx, hy] = head;
	const [tx, ty] = tail;

	const dx = Math.abs(hx - tx);
	const dy = Math.abs(hy - ty);

	return (dx <= 1 && dy <= 1);
}

// Could later refactor so that it returns [] of dir for diagonal and horizontal/vertical
function determineMovesForAxis(head: Coordinates, tail: Coordinates): Direction[] {
	const [hx, hy] = head;
	const [tx, ty] = tail;

	const dx = hx - tx;
	const dy = hy - ty;

	if (dx === 0) {
		if (dy > 0) return ["U"];
		if (dy < 0) return ["D"];
	}

	if (dy === 0) {
		if (dx > 0) return ["R"];
		if (dx < 0) return ["L"];
	}

	return [];
}

// Could later refactor so that it returns [] of dir for diagonal and horizontal/vertical
function determineMovesForDiagonal(head: Coordinates, tail: Coordinates): Direction[] {
	const [hx, hy] = head;
	const [tx, ty] = tail;

	const dx = hx - tx;
	const dy = hy - ty;

	if (dx > 0 && dy > 0) return ["U", "R"];
	if (dx < 0 && dy > 0) return ["U", "L"];
	if (dx > 0 && dy < 0) return ["D", "R"];
	if (dx < 0 && dy < 0) return ["D", "L"];

	return [];
}

function followTail(currPositions: Positions, dir: Direction, currTailIndex: number) {
	const head = currPositions[currTailIndex - 1];
	const tail = currPositions[currTailIndex];
	// console.log(currPositions)

	if (head[0] === tail[0] && head[1] === tail[1]) {
		// don't move since head on top of tail
		return;
	}

	if (!isInRadius(head, tail)) {
		// horizontal / vertical moves
		if (head[0] === tail[0] || head[1] === tail[1]) {
			determineMovesForAxis(head, tail)
				.forEach(move =>
					moveKnot(currPositions, move, currTailIndex)
				);

			// return;
		}

		// diagonal moves
		else {
			determineMovesForDiagonal(head, tail)
				.forEach(move =>
					moveKnot(currPositions, move, currTailIndex)
				);
		}
	}

	positionVisited.add(currPositions[currPositions.length - 1].toString());
}

function moveHead(currPositions: Positions, dir: Direction, moveAmount: number) {
	console.log(`===========================`);
	console.log(`${dir} ${moveAmount}:`);
	console.log(`===========================`);
	for (let i = 0; i < moveAmount; i++) {
		moveKnot(currPositions, dir, 0);

		for (let j = 1; j < currPositions.length; j++) {
			// console.log(currPositions)

			followTail(currPositions, dir, j);
		}
		// console.log(currPositions)
		// console.log(`---------------------------`);
	}
}

function getCountOfUniquePositionsTailVisits(input: string[], numKnots: number) {
	// Note: using .fill([0, 0]) would fill each element with the same reference to the [0, 0] obj
	const currPositions: Positions = [...Array(numKnots)].map(_ => [0, 0]);

	// console.log(currPositions)

	input.forEach(i => {
		const [dir, moveAmount] = i.split(" ");

		moveHead(currPositions, dir as Direction, +moveAmount);
	});

	return positionVisited.size;
}

const positionVisited = new Set<string>();
positionVisited.add("0,0");

console.log(getCountOfUniquePositionsTailVisits(splitInput, 10));