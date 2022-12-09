// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trimEnd()
	.split("\r\n")
	.map(i => i.split("").map(Number))

// console.log(splitInput);

// count outer trees
// 4 * (n - 2) + 4 === 4n - 4 === 4 * (n - 1)

// count inner visible trees

// iterate through each number

// check up
// check down
// check left
// check right

// function checkRight(input: number[][], startCoordinates: [number, number]) {
// 	let [i, j] = startCoordinates;
// 	const treeHeight = input[i][j];

// 	while (++j < input.length)
// 		if (treeHeight <= input[i][j]) return false;

// 	return true;
// }


// function checkLeft(input: number[][], startCoordinates: [number, number]) {
// 	let [i, j] = startCoordinates;
// 	const treeHeight = input[i][j];

// 	while (--j >= 0)
// 		if (treeHeight <= input[i][j]) return false;

// 	return true;
// }

// function checkDown(input: number[][], startCoordinates: [number, number]) {
// 	let [i, j] = startCoordinates;
// 	const treeHeight = input[i][j];

// 	while (++i < input.length)
// 		if (treeHeight <= input[i][j]) return false;

// 	return true;
// }

// function checkUp(input: number[][], startCoordinates: [number, number]) {
// 	let [i, j] = startCoordinates;
// 	const treeHeight = input[i][j];

// 	while (--i >= 0)
// 		if (treeHeight <= input[i][j]) return false;

// 	return true;
// }

type Direction = "up" | "down" | "left" | "right";

function checkDirections(input: number[][], startCoordinates: [number, number], direction: Direction) {
	let [i, j] = startCoordinates;
	const treeHeight = input[i][j];
	let loopCondition: () => boolean;

	switch (direction) {
		case "up": loopCondition = () => --i >= 0; break;
		case "down": loopCondition = () => ++i < input.length; break;
		case "left": loopCondition = () => --j >= 0; break;
		case "right":
		default: loopCondition = () => ++j < input.length;
	}

	while (loopCondition())
		if (treeHeight <= input[i][j]) return false;

	return true;
}

function isTreeVisible(input: number[][], startCoordinates: [number, number]) {
	const directions: Direction[] = ["up", "down", "left", "right"];

	return directions.some(direction => checkDirections(input, startCoordinates, direction));
}

function countInnerTrees(input: number[][]) {
	let visibleCount = 0;

	for (let i = 1; i < input.length - 1; i++)
		for (let j = 1; j < input.length - 1; j++)
			if (isTreeVisible(input, [i, j]))
				visibleCount++;

	return visibleCount;
}

function countOuterTrees(n: number) {
	return 4 * (n - 1);
}

function countVisibleTrees(input: number[][]) {
	let visibleTrees = countOuterTrees(input.length)

	visibleTrees += countInnerTrees(input);

	return visibleTrees;
}

console.log(countVisibleTrees(splitInput));