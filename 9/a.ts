// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trimEnd()
	.split("\r\n");

console.log(splitInput);

type Coordinates = [number, number];

type Direction = "U" | "D" | "L" | "R";

type Positions = {
	head: Coordinates;
	tail: Coordinates;
}

function moveKnot(currPositions: Positions, dir: Direction, mark: "head" | "tail") {
	switch (dir) {
		case "U":
			currPositions[mark][1]++;
			break;
		case "D":
			currPositions[mark][1]--;
			break;
		case "L":
			currPositions[mark][0]--;
			break;
		case "R":
		default:
			currPositions[mark][0]++;
	}
}

function isInRadius(head: Coordinates, tail: Coordinates) {
	const [hx, hy] = head;
	const [tx, ty] = tail;

	const dx = Math.abs(hx - tx);
	const dy = Math.abs(hy - ty);

	return (dx <= 1 && dy <= 1);
}

function followTail(currPositions: Positions, dir: Direction, prevHeadCoor: Coordinates) {
	const { head, tail } = currPositions;
	if (head[0] === tail[0] && head[1] === tail[1]) {
		// don't move since head on top of tail
		return;
	}

	if (!isInRadius(head, tail)) {
		// horizontal / vertical moves
		if (head[0] === tail[0] || head[1] === tail[1]) {
			moveKnot(currPositions, dir, "tail");
			// return;
		}

		// diagonal moves
		else currPositions.tail = [...prevHeadCoor];
	}

	positionVisited.add(currPositions.tail.toString());

}

function moveHead(currPositions: Positions, dir: Direction, num: number) {
	for (let i = 0; i < num; i++) {
		const prevHeadCoor: Coordinates = [...currPositions.head];
		moveKnot(currPositions, dir, "head");

		followTail(currPositions, dir, prevHeadCoor);
		// console.log(currPositions.head, currPositions.tail, dir);
	}
}

function getCountOfUniquePositionsTailVisits(input: string[]) {
	const currPositions: Positions = {
		head: [0, 0],
		tail: [0, 0]
	}

	input.forEach(i => {
		const [dir, num] = i.split(" ");

		moveHead(currPositions, dir as Direction, +num);
	});

	return positionVisited.size;
}

const positionVisited = new Set<string>();
positionVisited.add("0,0");

console.log(getCountOfUniquePositionsTailVisits(splitInput));
// const test = [0, 0];
// console.log([0, 0].toString())
// test[1]++
// console.log(test)

console.log(Array(...positionVisited));

console.log(isInRadius([4, 2], [3, 0]));