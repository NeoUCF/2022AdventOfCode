// const input: string = await Deno.readTextFile("./exampleInput5.txt");
const input: string = await Deno.readTextFile("./input.txt");

const formattedInput = input.trimEnd();

console.log(formattedInput);

function hasDup(window: string) {
	return /(.).*\1/.test(window);
}

// O(kn), where n is input.length and k is window size
function getNumCharactersBeforeNoDupInWindow(input: string, k: number) {

	for (let i = 0; i < input.length; i++) {
		const windowCheck = input.slice(i, k + i);

		if (hasDup(windowCheck) === false) return k + i;
	}

	return -1;
}

console.log(getNumCharactersBeforeNoDupInWindow(formattedInput, 14))