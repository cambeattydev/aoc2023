async function part1() {
  const text = await Deno.readTextFile("./input.txt");

  const leftOverSymbols = text
    .replaceAll(".", "")
    .replaceAll(new RegExp("[0-9]", "g"), "")
    .replaceAll("\n", "");
  const symbols = new Set();
  for (const symbol of leftOverSymbols) {
    symbols.add(symbol);
  }

  const lines = text.split("\n");

  const validNumbers: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    let prevLine: string;
    let nextLine: string;
    const currentLine = lines[i];
    if (i > 0) {
      prevLine = lines[i - 1];
    }
    if (i < lines.length - 1) {
      nextLine = lines[i + 1];
    }

    const digitRegex = new RegExp("([0-9]+)", "g");
    const matches = Array.from(currentLine.matchAll(digitRegex));
    //  if (!matches) continue;
    for (let match of matches) {
      //console.log(match);
      //for (const match of matches) {
      const num = Number(match[0]);
      const index = match.index!;
      const lastIndex = index + match[0].length;
      numCheck: for (let j = index; j <= lastIndex - 1; j++) {
        //Check
        //before
        if (j > 0) {
          if (symbols.has(currentLine[j - 1])) {
            validNumbers.push(num);
            break numCheck;
          }
        }
        //After
        if (j < currentLine.length - 1) {
          if (symbols.has(currentLine[j + 1])) {
            validNumbers.push(num);
            break numCheck;
          }
        }
        //Above
        if (prevLine) {
          //Above
          if (symbols.has(prevLine[j])) {
            validNumbers.push(num);
            break numCheck;
          }
          //Left Above
          if (index > 0) {
            if (symbols.has(prevLine[j - 1])) {
              validNumbers.push(num);
              break numCheck;
            }
          }
          //Right Above
          if (j < prevLine.length - 1) {
            if (symbols.has(prevLine[j + 1])) {
              validNumbers.push(num);
              break numCheck;
            }
          }
        }

        if (nextLine) {
          //Below
          if (symbols.has(nextLine[j])) {
            validNumbers.push(num);
            break numCheck;
          }
          //Left Below
          if (index > 0) {
            if (symbols.has(nextLine[j - 1])) {
              validNumbers.push(num);
              break numCheck;
            }
          }
          //Right Above
          if (j < nextLine.length - 1) {
            if (symbols.has(nextLine[j + 1])) {
              validNumbers.push(num);
              break numCheck;
            }
          }
        }
      }
    }
  }

  const res = validNumbers.reduce((sum, current) => sum + current, 0);
  console.log(res);
}

type SchematicLocation<T> = {
  x: number;
  y: number;
  length: number;
  val: T;
};

async function part2() {
  const text = await Deno.readTextFile("./input.txt");

  const lines = text.split("\n");

  const partNums: SchematicLocation<number>[] = [];
  const gearLocations: SchematicLocation<string>[] = [];
  const partRegex = new RegExp("[0-9]+", "g");
  const gearRegex = /\*/g;

  for (let i = 0; i < lines.length; i++) {
    let currentLine = lines[i];
    let partMatches = currentLine.matchAll(partRegex);
    let gearMatches = currentLine.matchAll(gearRegex);
    for (let partMatch of partMatches) {
      let part = partMatch[0];
      partNums.push({
        length: part.length,
        val: Number(part),
        x: partMatch.index!,
        y: i,
      });
    }
    for (let gearMatch of gearMatches) {
      let gear = gearMatch[0];
      gearLocations.push({
        length: 1,
        val: gear,
        x: gearMatch.index!,
        y: i,
      });
    }
  }
  let total = 0;
  for (let gearLocation of gearLocations) {
    let matchingNums = partNums.filter((part) => isNearby(gearLocation, part));
    if (matchingNums.length == 2) {
      console.log(matchingNums[0], matchingNums[1], gearLocation);
      total += matchingNums[0].val * matchingNums[1].val;
    }
  }
  console.log(total);
}

function isNearby(
  gear: SchematicLocation<string>,
  part: SchematicLocation<number>
): boolean {
  if (gear.y <= part.y - 2 || gear.y >= part.y + 2) {
    return false;
  }

  const spotsToCheck = Array.from(
    { length: part.length + 2 },
    (v, k) => k + part.x - 1
  );
  if (spotsToCheck.includes(gear.x)) {
    return true;
  }

  return false;
}

//part1();

part2();
