const input: string = await Deno.readTextFile("./exampleInput.txt");
// const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trimEnd()
	.split("\r\n")
	.map(i => i.split("").map(Number))

console.log(splitInput);
console.log(splitInput[2][3]);

// count outer trees
// 4 * (n - 2) + 4 === 4n - 4 === 4 * (n - 1)

// count inner visible trees

// iterate through each number

// check up
// check down
// check left
// check right

function checkRight(input: number[][], startCoordinates: [number, number]) {
	let [i, j] = startCoordinates;
	const treeHeight = input[i][j];

	while (++j < input.length)
		if (treeHeight <= input[i][j]) return false;

	return true;
}


function checkLeft(input: number[][], startCoordinates: [number, number]) {
	let [i, j] = startCoordinates;
	const treeHeight = input[i][j];

	while (--j >= 0)
		if (treeHeight <= input[i][j]) return false;

	return true;
}

function checkDown(input: number[][], startCoordinates: [number, number]) {
	let [i, j] = startCoordinates;
	const treeHeight = input[i][j];

	while (++i < input.length)
		if (treeHeight <= input[i][j]) return false;

	return true;
}

function checkUp(input: number[][], startCoordinates: [number, number]) {
	let [i, j] = startCoordinates;
	const treeHeight = input[i][j];

	while (--i >= 0)
		if (treeHeight <= input[i][j]) return false;

	return true;
}

function isTreeVisible(input: number[][], startCoordinates: [number, number]) {
	if (checkUp(input, startCoordinates)) return true;
	if (checkDown(input, startCoordinates)) return true;
	if (checkLeft(input, startCoordinates)) return true;
	if (checkRight(input, startCoordinates)) return true;
	return false;
}

function countInnerTrees(input: number[][]) {
	let visibleCount = 0;

	for (let i = 1; i < input.length - 1; i++) {
		for (let j = 1; j < input.length - 1; j++) {
			if (isTreeVisible(input, [i, j])) {
				visibleCount++;
				continue;
			}
		}
	}

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