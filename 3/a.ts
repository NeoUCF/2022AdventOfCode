// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trim()
	.split("\r\n")

console.log(splitInput);

function convertCharToNum(c: string | undefined) {
	if (c === undefined) return 0;

	if (c === c.toLocaleLowerCase()) return c.charCodeAt(0) - "a".charCodeAt(0) + 1;
	return c.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

function findItemInBothCompartments(c1: string, c2: string) {
	const compartmentSet = new Set<string>(c1.split(""))

	for (let i = 0; i < c2.length; i++)
		if (compartmentSet.has(c2[i])) return c2[i];
}

function findPriority(rucksack: string) {
	const splitAtIndex = (rucksack.length / 2);
	const compartment1 = rucksack.slice(0, splitAtIndex);
	const compartment2 = rucksack.slice(splitAtIndex);

	const item = findItemInBothCompartments(compartment1, compartment2);
	return convertCharToNum(item);
}

function getItemPrioritySum(input: string[]) {
	return input.reduce((acc, cur) => acc + findPriority(cur), 0);
}

// console.log(convertCharToNum("Z"));
// console.log(findPriority("vJrwpWtwJgWrhcsFMMfFFhFp"));
console.log(getItemPrioritySum(splitInput));