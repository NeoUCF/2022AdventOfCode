// const input: string = await Deno.readTextFile("./exampleInput.txt");
// const input: string = await Deno.readTextFile("./exampleInput2.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trimEnd()
	.split("\r\n");

// console.log(splitInput);

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
			currPositions[knotIndex][0]++;
	}
}

function isInRadius(x: number, y: number) {
	const ax = Math.abs(x);
	const ay = Math.abs(y);

	return (ax <= 1 && ay <= 1);
}

function determineMoves(head: Coordinates, tail: Coordinates): Direction[] {
	const [hx, hy] = head;
	const [tx, ty] = tail;

	const dx = hx - tx;
	const dy = hy - ty;

	if (isInRadius(dx, dy)) return [];

	// Move horizontally/vertically
	if (dx === 0 || dy === 0) {
		if (dy > 0) return ["U"];
		if (dy < 0) return ["D"];
		if (dx > 0) return ["R"];
		if (dx < 0) return ["L"];
	}

	// Move Diagonally
	if (dx > 0 && dy > 0) return ["U", "R"];
	if (dx < 0 && dy > 0) return ["U", "L"];
	if (dx > 0 && dy < 0) return ["D", "R"];
	if (dx < 0 && dy < 0) return ["D", "L"];

	return [];
}

function followTail(currPositions: Positions, currTailIndex: number) {
	const head = currPositions[currTailIndex - 1];
	const tail = currPositions[currTailIndex];
	// console.log(currPositions)

	determineMoves(head, tail)
		.forEach(move => moveKnot(currPositions, move, currTailIndex));

	positionVisited.add(currPositions[currPositions.length - 1].toString());
}

function moveHead(currPositions: Positions, dir: Direction, moveAmount: number) {
	// console.log(`===========================`);
	// console.log(`${dir} ${moveAmount}:`);
	// console.log(`===========================`);
	for (let i = 0; i < moveAmount; i++) {
		moveKnot(currPositions, dir, 0);

		for (let j = 1; j < currPositions.length; j++) {
			// console.log(currPositions)

			followTail(currPositions, j);
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