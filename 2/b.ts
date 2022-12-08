// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

type Round = [string, string];

const splitInput: Round[] = input
	.trim()
	.split("\r\n")
	.map(i => i.split(" ") as Round);

function getScoreOfResult(result: string | undefined) {
	switch (result) {
		case "X": return 0;
		case "Y": return 3;
		case "Z": return 6;
		default: return 0;
	}
}

function determineShapeIShouldPlay(opponent: string, me: string) {
	// This is a very readable solution, but I'd like
	// to use an array and mods to shorten code
	switch (me) {
		case "X":
			if (opponent === "A") return "C";
			if (opponent === "B") return "A";
			if (opponent === "C") return "B";
			break;
		case "Y": return opponent;
		case "Z":
			if (opponent === "A") return "B";
			if (opponent === "B") return "C";
			if (opponent === "C") return "A";
			break;
		default: return undefined;
	}
}

function getGameResultScore(me: string | undefined) {
	switch (me) {
		case "A": return 1;
		case "B": return 2;
		case "C": return 3;
		default: return 0;
	}
}

function getTotalScore(games: Round[]) {
	const gamesScoreList = games.map(game => getScoreOfResult(game[1]) + getGameResultScore(determineShapeIShouldPlay(...game)));
	console.log("Score for each game:", gamesScoreList);

	return gamesScoreList.reduce((acc, cur) => acc + cur);
}

console.log(getTotalScore(splitInput));