const input: string = await Deno.readTextFile("./exampleInput3.txt");
// const input: string = await Deno.readTextFile("./input.txt");

const formattedInput = input.trimEnd();

console.log(formattedInput);

function slidingWindow(input: string, n: number) {
	const windowCheck = input.slice(0, n - 1).split("");
	console.log(windowCheck)

	// init array
	for (let i = n - 1; i < input.length;) {
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

console.log(slidingWindow(formattedInput, 4));