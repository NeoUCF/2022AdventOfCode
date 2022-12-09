// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trimEnd()
	.split("\r\n")
	.map(i => i.split("").map(Number))

// console.log(splitInput);

type Direction = "up" | "down" | "left" | "right";

function getDirectionScore(input: number[][], startCoordinates: [number, number], direction: Direction) {
	let [i, j] = startCoordinates;
	const treeHeight = input[i][j];
	let treesViewed = 0;
	let loopCondition: () => boolean;

	switch (direction) {
		case "up": loopCondition = () => --i >= 0; break;
		case "down": loopCondition = () => ++i < input.length; break;
		case "left": loopCondition = () => --j >= 0; break;
		case "right":
		default: loopCondition = () => ++j < input.length;
	}

	while (loopCondition()) {
		treesViewed++;
		if (treeHeight <= input[i][j]) break;
	}


	return treesViewed;
}

function getTreeScenicScore(input: number[][], startCoordinates: [number, number]) {
	const directions: Direction[] = ["up", "down", "left", "right"];

	return directions
		.map(direction => getDirectionScore(input, startCoordinates, direction))
		.reduce((acc, cur) => cur * acc);
}

function getScenicScores(input: number[][]) {
	const scenicScores: number[] = [];

	// Don't go through trees on edges.
	// (If a tree is right on the edge, at least one of its viewing distances will be zero.)
	for (let i = 1; i < input.length - 1; i++)
		for (let j = 1; j < input.length - 1; j++)
			scenicScores.push(getTreeScenicScore(input, [i, j]));

	return scenicScores;
}

function getHighestScenicScore(input: number[][]) {
	const scenicScores: number[] = getScenicScores(input);

	// Note if input is a 2x2 or 1x1, scenic view would be 0

	return scenicScores.length === 0 ? 0 : Math.max(...scenicScores);
}

console.log(getHighestScenicScore(splitInput));