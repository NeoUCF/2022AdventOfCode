// const input: string = await Deno.readTextFile("./exampleInput.txt");
const input: string = await Deno.readTextFile("./input.txt");

const splitInput = input
	.trimEnd()
	.split("\r\n")

console.log(splitInput);

type File = {
	name: string;
	size: number;
}

type Directory = {
	name: string;
	size: number;
	parentDir: Directory;
	subDir: Directory[]; // Optimize using a map
	files: File[];
}

function directoryFactory(parentDir: Directory, name: string): Directory {
	return {
		name,
		parentDir,
		size: 0,
		subDir: [],
		files: []
	};
}

function adjustSizes(currDir: Directory, add: number) {
	while (true) {
		currDir.size += add;

		if (currDir.name === "/") return;

		currDir = currDir.parentDir;
	}
}

function parseDirectory(currDir: Directory, res: string[]) {
	res.forEach(r => {
		const lex = r.split(" ");

		if (lex[0] === "dir") currDir.subDir.push(directoryFactory(currDir, lex[1]));

		if (!isNaN(+lex[0])) {
			const file: File = {
				name: lex[1],
				size: +lex[0]
			};

			currDir.files.push(file);
			adjustSizes(currDir, +lex[0]);
		}
	});
}

function switchDirectory(root: Directory, currDir: Directory, dirToSwitch: string) {
	if (dirToSwitch === "/") return root;
	if (dirToSwitch === "..") return currDir.parentDir;

	for (let i = 0; i < currDir.subDir.length; i++)
		if (currDir.subDir[i].name === dirToSwitch) return currDir.subDir[i];

	return currDir;
}

function parseCommands(input: string[]) {
	const parsedCmd: string[][] = [];
	let temp: string[] = [];

	input.forEach(line => {
		if (line[0] === "$") {
			parsedCmd.push(temp);
			temp = [];
		}

		temp.push(line);
	});

	parsedCmd.push(temp);

	if (parsedCmd[0].length === 0)
		parsedCmd.shift();

	return parsedCmd;
}

function initFileSystem(): Directory {
	const fileSystem: any = {
		name: "/",
		size: 0,
		subDir: [],
		files: []
	};

	fileSystem["parentDir"] = fileSystem;

	return fileSystem;
}

function parseFileSystem(input: string[]) {
	const fileSystem: Directory = initFileSystem();

	// console.log(fileSystem);

	let currentDir = fileSystem;

	const parsedCmd = parseCommands(input);

	// console.log(parsedCmd);

	parsedCmd.forEach(cmd => {
		const lex = cmd[0].split(" ");

		if (lex[1] === "cd")
			currentDir = switchDirectory(fileSystem, currentDir, lex[2]);
		else if (lex[1] === "ls")
			parseDirectory(currentDir, cmd.slice(1));
	});

	return fileSystem
}

function getDirListBelowASize(fileSystem: Directory, sizeLimit: number) {
	const dirList = [];

	if (fileSystem.size <= sizeLimit) dirList.push(fileSystem);

	fileSystem.subDir.forEach(dir => {
		const subDirList = getDirListBelowASize(dir, sizeLimit);

		dirList.push(...subDirList);
	})

	return dirList;
}

function getSumOfDirSizes(dirList: Directory[]) {
	let sum = 0;

	dirList.forEach(dir => {
		sum += dir.size;
	})

	return sum;
}

function sumOfDirBelowASize(input: string[], sizeLimit: number) {
	const fileSystem = parseFileSystem(input);

	const dirList = getDirListBelowASize(fileSystem, sizeLimit);

	const sumOfSizes = getSumOfDirSizes(dirList);

	return sumOfSizes;
}

console.log(sumOfDirBelowASize(splitInput, 100000));