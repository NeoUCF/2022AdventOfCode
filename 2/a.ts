// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

type Round = [string, string];

const splitInput: Round[] = input
	.trim()
	.split("\r\n")
	.map(i => {
		const temp = i.split(" ");
		switch (temp[1]) {
			case "X": temp[1] = "A"; break;
			case "Y": temp[1] = "B"; break;
			case "Z": temp[1] = "C"; break;
		}

		return temp as Round;
	})

console.log(splitInput);

function getScoreOfShape(shape: string | undefined) {
	switch (shape) {
		case "A": return 1;
		case "B": return 2;
		case "C": return 3;
		default: return 0;
	}
}

function getGameResultScore(opponent: string, me: string | undefined) {
	if (me === undefined) return 0;
	if (opponent === me) return 3; // draw

	switch (opponent) {
		case "A": return me === "B" ? 6 : 0;
		case "B": return me === "C" ? 6 : 0;
		case "C": return me === "A" ? 6 : 0;
		default: return 0;
	}
}

function getTotalScore(games: Round[]) {
	const gamesScoreList = games.map(game => getScoreOfShape(game[1]) + getGameResultScore(...game));
	console.log("Score for each game:", gamesScoreList);

	return gamesScoreList.reduce((acc, cur) => acc + cur);
}

console.log(getTotalScore(splitInput));