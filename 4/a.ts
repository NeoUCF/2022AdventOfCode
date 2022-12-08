// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trim()
	.split("\r\n")

console.log(splitInput);

function inRange(elf1: number[], elf2: number[]) {
	if (elf1[0] <= elf2[0])
		if (elf1[1] >= elf2[1])
			return true;

	return false;
}

function formatElves(elfPair: string) {
	const elves = elfPair.split(",");
	const elf1 = elves[0].split("-").map(Number);
	const elf2 = elves[1].split("-").map(Number);

	return [elf1, elf2];
}

function isFullyContained(elfPair: string) {
	const [elf1, elf2] = formatElves(elfPair);

	return inRange(elf1, elf2) || inRange(elf2, elf1);
}

function getHowManyFullyContained(input: string[]) {
	return input.reduce((acc, cur) => acc + (isFullyContained(cur) ? 1 : 0), 0);
}

console.log(getHowManyFullyContained(splitInput));