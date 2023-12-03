const text = await Deno.readTextFile("./input.txt");

const lines = text.split("\n");

const seeds = lines[0].match(new RegExp("[0-9]+", "g"))?.map((n) => Number(n))!;
type SeedStart = {
  start: number;
  length: number;
};
const seedLineP2 = lines[0].split(":")[1].trim().split(" ").map((n) =>
  Number(n)
);
const seedStart: SeedStart[] = [];
let currentSeedStart;
for (let i = 0; i < seedLineP2.length; i++) {
  if (!currentSeedStart) {
    currentSeedStart = {} as SeedStart;
  }
  if (i % 2 == 0) {
    currentSeedStart.start = seedLineP2[i];
  } else {
    currentSeedStart.length = seedLineP2[i];
    seedStart.push(currentSeedStart);
    currentSeedStart = null;
  }
}

console.log(seedStart);

// const finalSeeds: Number[] = [];
// for (let seedInfo of seedStart) {
//   for (let i = seedInfo.start; i <= seedInfo.length; i++) {
//     finalSeeds.push(i);
//   }
// }

// console.log(finalSeeds);

//console.log(seeds);
const seedMapStart = lines.findIndex((l) => l.startsWith("seed-to-soil map:"));
const soilToFertStart = lines.findIndex((l) =>
  l.startsWith("soil-to-fertilizer map:")
);
const fertToWaterStart = lines.findIndex((l) =>
  l.startsWith("fertilizer-to-water map:")
);
const waterToLightStart = lines.findIndex((l) =>
  l.startsWith("water-to-light map:")
);
const lightToTempStart = lines.findIndex((l) =>
  l.startsWith("light-to-temperature map:")
);
const tempToHumidityStart = lines.findIndex((l) =>
  l.startsWith("temperature-to-humidity map:")
);
const humidityToLocationStart = lines.findIndex((l) =>
  l.startsWith("humidity-to-location map:")
);

const seedToSoilLines = createMap(
  lines.slice(seedMapStart + 1, soilToFertStart - 1),
);
const soilToFertLines = createMap(
  lines.slice(soilToFertStart + 1, fertToWaterStart - 1),
);
const fertToWaterLines = createMap(lines.slice(
  fertToWaterStart + 1,
  waterToLightStart - 1,
));
const waterToLightLines = createMap(lines.slice(
  waterToLightStart + 1,
  lightToTempStart - 1,
));
const lightToTempLines = createMap(lines.slice(
  lightToTempStart + 1,
  tempToHumidityStart - 1,
));
const tempToHumidityLines = createMap(lines.slice(
  tempToHumidityStart + 1,
  humidityToLocationStart - 1,
));
const humidityToLocationLines = createMap(
  lines.slice(humidityToLocationStart + 1),
);

/*
console.log(seedToSoilLines);
console.log(soilToFertLines);
console.log(fertToWaterLines);
console.log(waterToLightLines);
console.log(lightToTempLines);
console.log(tempToHumidityLines);
console.log(humidityToLocationLines);
*/
let minNum = Number.MAX_VALUE;
for (let seed of seeds) {
  const soilNumber = findNextVal(seed, seedToSoilLines);
  console.log(soilNumber);
  const fertNumber = findNextVal(soilNumber, soilToFertLines);
  console.log(fertNumber);
  const waterNumber = findNextVal(fertNumber, fertToWaterLines);
  console.log(waterNumber);
  const lightNumber = findNextVal(waterNumber, waterToLightLines);
  console.log(lightNumber);
  const tempNumber = findNextVal(lightNumber, lightToTempLines);
  console.log(tempNumber);
  const humidityNumber = findNextVal(tempNumber, tempToHumidityLines);
  console.log(humidityNumber);
  const locationNumber = findNextVal(humidityNumber, humidityToLocationLines);
  console.log(locationNumber);
  if (locationNumber < minNum) {
    minNum = locationNumber;
  }
  console.log("----------------------------");
}
console.log(minNum);

type MapLines = {
  destination: number;
  source: number;
  length: number;
};

function findNextVal(sourceNumber: number, sourceMap: MapLines[]) {
  const matchingLine = sourceMap.find((m) =>
    m.source <= sourceNumber && m.source + m.length >= sourceNumber
  );
  if (matchingLine) {
    const dif = sourceNumber - matchingLine.source;
    return dif + matchingLine.destination;
  }
  return sourceNumber;
}
function findNextValP2(sourceStart: SeedStart, sourceMap: MapLines[]) {
}

function createMap(lines: string[]) {
  const res: MapLines[] = [];
  for (let l of lines) {
    const splits = l.split(" ").map((f) => Number(f.trim()));
    res.push({
      destination: splits[0],
      source: splits[1],
      length: splits[2],
    });
  }
  return res;
}
