const text = await Deno.readTextFile("./input.txt");
//const text = await Deno.readTextFile("./test.txt");

const lines = text.split("\n");

function part1() {
  const maxes = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const inavlaidGames = lines.map((l) => {
    const game = parseLine(l);
    let possibleGame = true;
    game.rounds.forEach((r) => {
      if (r.blue > maxes.blue) {
        possibleGame = false;
      }
      if (r.green > maxes.green) {
        possibleGame = false;
      }
      if (r.red > maxes.red) {
        possibleGame = false;
      }
      if (!possibleGame) return;
    });
    return possibleGame ? game.id : 0;
  });
  //console.log(inavlaidGames);
  console.log(inavlaidGames.reduce((sum, current) => sum + current, 0));
}

function part2() {
  const minNumbers = lines.map((l) => {
    const game = parseLine(l);
    let possibleGame = true;
    let minCubes = {
      blue: 0,
      red: 0,
      green: 0,
    } as Round;
    game.rounds.forEach((r) => {
      minCubes.red = minCubes.red < r.red ? r.red : minCubes.red;
      minCubes.blue = minCubes.blue < r.blue ? r.blue : minCubes.blue;
      minCubes.green = minCubes.green < r.green ? r.green : minCubes.green;
    });
    const powers = minCubes.red * minCubes.blue * minCubes.green;
    console.log(powers);
    return powers;
  });
  console.log(minNumbers.reduce((sum, current) => sum + current, 0));
}

type Game = {
  id: number;
  rounds: Round[];
};
type Round = {
  blue: number;
  green: number;
  red: number;
};
function parseLine(l: string): Game {
  var gameRegex = new RegExp("Game (?<gameNum>[0-9]+):");
  let gameMatch = l.match(gameRegex);
  let rounds = l.split(":")[1].split(";");
  const cubeRegex = new RegExp("(?<num>[0-9]+) (?<color>green|blue|red)");
  let gameRounds: Round[] = [];
  for (let roundString of rounds) {
    const cubes = roundString.split(",");
    var round = {
      blue: 0,
      green: 0,
      red: 0,
    } as Round;
    for (let nums of cubes) {
      var matches = nums.match(cubeRegex);
      round[matches.groups.color] = Number(matches.groups.num);
    }
    gameRounds.push(round);
  }
  //console.log(gameRounds);
  return {
    id: Number(gameMatch!.groups!.gameNum),
    rounds: gameRounds,
  } as Game;
}

//part1();

part2();
