// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trimEnd()
	.split("\r\n")

console.log(splitInput);

function parseMoves(moves: string[]) {
	return moves.map(m => {
		const temp = m.split("from");
		const moveAmount = temp[0].slice(5).trim();
		const [from, to] = temp[1].split("to");

		return [+moveAmount, +from, +to];
	})
}

function parseBoxes(boxes: string[], n: number) {
	const stackArr: string[][] = [];

	for (let i = 1; i <= n; i++) {
		const temp: string[] = [];
		boxes.forEach(line => {
			if (line[1 + (i - 1) * 4] !== " ")
				temp.unshift(line[1 + (i - 1) * 4])
		});

		stackArr.push(temp);
	}

	return stackArr;
}

function findNumStacks(stackIndex: string) {
	return stackIndex.trim().split("   ").length;
}

function separateInput(splitInput: string[]): [string[], string, string[]] {
	const slicePoint = splitInput.findIndex(line => line === "");

	const boxes = splitInput.slice(0, slicePoint - 1);
	const stackIndex = splitInput[slicePoint - 1];
	const moves = splitInput.slice(slicePoint + 1);
	return [boxes, stackIndex, moves]
}

function rearrange(boxStack: string[][], procedures: number[][]) {
	procedures.forEach(([move, from, to]) => {
		const tempFrom = boxStack[from - 1].splice(-move);

		boxStack[to - 1] = [...boxStack[to - 1], ...tempFrom];
	})
}

function getTopCrates(splitInput: string[]) {
	const [boxes, stackIndex, moves] = separateInput(splitInput);
	const numStacks = findNumStacks(stackIndex);
	const boxStack = parseBoxes(boxes, numStacks);
	const procedures = parseMoves(moves);

	rearrange(boxStack, procedures);

	return boxStack.map(s => s.at(-1)).join("");
}

console.log(getTopCrates(splitInput));