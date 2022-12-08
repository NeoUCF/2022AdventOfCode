// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trim()
	.split("\r\n")

const groupedInput: string[][] = [];
const chunk = 3;

for (let i = 0; i < splitInput.length; i += chunk) {
	groupedInput.push(splitInput.slice(i, i + chunk))
}

console.log(splitInput);
console.log(groupedInput);

function convertCharToNum(c: string | undefined) {
	if (c === undefined) return 0;

	if (c === c.toLocaleLowerCase()) return c.charCodeAt(0) - "a".charCodeAt(0) + 1;
	return c.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

// Helper for optimizing performance
function findSmallestRucksackIndex(sets: Set<string>[]) {
	const setSizes = sets.map(set => set.size);
	const smallestSetSize = Math.min(...setSizes);

	return setSizes.indexOf(smallestSetSize);
}

function findCommonItemInRucksacks(rucksacks: string[]) {
	const rucksackSet = rucksacks.map(r => new Set<string>(r.split("")));

	const smallestRucksackIndex = findSmallestRucksackIndex(rucksackSet);
	const smallestRucksack = rucksacks[smallestRucksackIndex].split("");

	for (let i = 0; i < smallestRucksack.length; i++) {
		const item = smallestRucksack[i];

		if (rucksackSet.every(set => set.has(item)))
			return item;
	}
}

function findGroupPriority(group: string[]) {
	const inAllRucksacks = findCommonItemInRucksacks(group);

	return convertCharToNum(inAllRucksacks);
}

function getItemPrioritySum(input: string[][]) {
	return input.reduce((acc, cur) => acc + findGroupPriority(cur), 0);
}

console.log(getItemPrioritySum(groupedInput));