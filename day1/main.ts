const text = await Deno.readTextFile("./input.txt");
//const text = await Deno.readTextFile("./test.txt");

const lines = text.split("\n");

class TextLocation {
  constructor(
    public num: number,
    public spelledOutVal: string,
    public first: number = Number.MIN_VALUE,
    public last: number = Number.MIN_VALUE
  ) {}

  NumerAsString(): string {
    return this.num.toString();
  }
}

// let nums = lines.map((l) => {
//   let num1: string;
//   let num2: string;
//   const chars = [...l];
//   chars.forEach((c) => {
//     if (numberStrings.includes(c)) {
//       if (!num1) {
//         num1 = c;
//       } else {
//         num2 = c;
//         return;
//       }
//     }
//   });
//   return Number(num1.concat(num2 ?? num1));
// });

// console.log(nums.reduce((sum, current) => sum + current, 0));

let nums = lines.map((l) => {
  const textLocations = [
    new TextLocation(0, "zero"),
    new TextLocation(1, "one"),
    new TextLocation(2, "two"),
    new TextLocation(3, "three"),
    new TextLocation(4, "four"),
    new TextLocation(5, "five"),
    new TextLocation(6, "six"),
    new TextLocation(7, "seven"),
    new TextLocation(8, "eight"),
    new TextLocation(9, "nine"),
  ];

  textLocations.forEach((v) => {
    v.first = l.indexOf(v.NumerAsString());
    v.last = l.lastIndexOf(v.NumerAsString());

    const firstSpelledOut = l.indexOf(v.spelledOutVal);
    if (v.first < 0 || (firstSpelledOut >= 0 && firstSpelledOut < v.first)) {
      v.first = firstSpelledOut;
    }
    const lastSpelledOut = l.lastIndexOf(v.spelledOutVal);
    if (v.last < 0 || (lastSpelledOut >= 0 && lastSpelledOut > v.last)) {
      v.last = lastSpelledOut;
    }
  });

  let minTextLocation = textLocations[0];
  let maxTextLocation = textLocations[0];
  textLocations.slice(1).forEach((tl) => {
    if (tl.first > -1) {
      if (minTextLocation.first == -1 || tl.first < minTextLocation.first) {
        minTextLocation = tl;
      }
    }
    if (tl.last > -1) {
      if (maxTextLocation.last == -1 || tl.last > maxTextLocation.last) {
        maxTextLocation = tl;
      }
    }
  });

  if (minTextLocation.first === -1 && minTextLocation.last === -1) {
    minTextLocation = maxTextLocation;
  }
  if (maxTextLocation.first === -1 && maxTextLocation.last === -1) {
    maxTextLocation = minTextLocation;
  }
  //console.log(minTextLocation, maxTextLocation);
  const num = Number(
    minTextLocation.NumerAsString().concat(maxTextLocation.NumerAsString())
  );
  console.log(num);
  return num;
});

console.log(nums.reduce((sum, current) => sum + current, 0));
