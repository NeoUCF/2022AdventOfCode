// const input: string = await Deno.readTextFile("./exampleInput5.txt");
const input: string = await Deno.readTextFile("./input.txt");

const formattedInput = input.trimEnd();

console.log(formattedInput);

function slidingWindow(input: string, k: number) {
	const windowCheck = input.slice(0, k - 1).split("");
	console.log(windowCheck)

	// init array
	for (let i = k - 1; i < input.length;) {
		console.log(input[i])

		const relativeIndexOfDup = windowCheck.indexOf(input[i]);
		console.log("relativeIndexOfDup:", relativeIndexOfDup);
		if (relativeIndexOfDup === -1) return [[...windowCheck, input[i]].join(""), i + 1];


		// const indexOfDup = i - (n - (relativeIndexOfDup + 1));
		// const indexOfDup = i - n + relativeIndexOfDup + 1;
		// const shift = n - (i - indexOfDup);
		const shift = relativeIndexOfDup + 1;

		for (let j = 0; j < shift; j++) {
			windowCheck.shift();
			windowCheck.push(input[i + j]);
		}

		i += shift;
		console.log(i)
		console.log(windowCheck)
	}

	// console.log(windowCheck.keys());
	console.log([...windowCheck.entries()]);
	console.log([...windowCheck.keys()].join(""));
}

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

// console.log(slidingWindow(formattedInput, 4));
console.log(getNumCharactersBeforeNoDupInWindow(formattedInput, 4))