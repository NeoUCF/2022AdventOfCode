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
console.log("Largest calorie:", Math.max(...totalCalories));
