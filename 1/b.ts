// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trim()
	.split("\r\n")
	.map(i => parseInt(i));

const totalCalories: number[] = [];
let accumulator = 0;


splitInput.forEach(i => {
	if (isNaN(i)) {
		totalCalories.push(accumulator);
		accumulator = 0;
	} else {
		accumulator += i;
	}
});

console.log(totalCalories);

const sortedCalories = totalCalories.sort((a, b) => a - b);
const top3Calories = sortedCalories.slice(-3);

console.log("Top 3:", top3Calories);

console.log("Sum of top 3:", top3Calories.reduce((acc, cur) => acc + cur));