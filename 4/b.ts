// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trim()
	.split("\r\n")

console.log(splitInput);

function inRange(elfMinima: number[], elfMaxima: number[]) {
	if (elfMinima[1] < elfMaxima[0]) return false;

	return true;
}

function formatElves(elfPair: string) {
	const elves = elfPair.split(",");
	const elf1 = elves[0].split("-").map(Number);
	const elf2 = elves[1].split("-").map(Number);

	return [elf1, elf2];
}

function isOverlapped(elfPair: string) {
	const [elf1, elf2] = formatElves(elfPair);

	if (Math.min(...elf1) < Math.min(...elf2))
		return inRange(elf1, elf2);
	else
		return inRange(elf2, elf1);
}

function getHowManyOverlapped(input: string[]) {
	return input.reduce((acc, cur) => acc + (isOverlapped(cur) ? 1 : 0), 0);
}

console.log(getHowManyOverlapped(splitInput));