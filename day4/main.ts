const text = await Deno.readTextFile("./input.txt");

function part1(text: string){
const winCounts = text.split("\n").map(l => {
    const cardInfo =  l.split(":")[0];
    const afterCardNumber =l.split(":")[1];
    const numbers = afterCardNumber.split("|");
    const winners = numbers[0].trim().split(new RegExp(" +")).map(n => Number(n));
    //console.log(winners)
    const elfNums = numbers[1].trim().split(new RegExp(" +")).map(n => Number(n));
    //console.log(elfNums)

    const matches = winners.filter(w => elfNums.indexOf(w) >= 0);
    //console.log(cardInfo, matches);
    if (matches.length == 0) return 0;
    const count = matches.reduce((sum, current, index) => {
        if (index == 0) return 1;
        return sum *2 },0)
    //console.log(count);
    return count;
});
console.log(winCounts.reduce ((sum, current) => sum + current, 0));
}

function part2(text: string){
    const originalsAndCopies: number[] = [];
    text.split("\n").forEach((l, index) => {
    //Add current card to list
    if (originalsAndCopies.length <= index){
        originalsAndCopies.push(1);
    }else{
        originalsAndCopies[index] = originalsAndCopies[index] + 1; 
    }
    const afterCardNumber =l.split(":")[1];
    const numbers = afterCardNumber.split("|");
    const winners = numbers[0].trim().split(new RegExp(" +")).map(n => Number(n));
    //console.log(winners)
    const elfNums = numbers[1].trim().split(new RegExp(" +")).map(n => Number(n));
    //console.log(elfNums)

    const matches = winners.filter(w => elfNums.indexOf(w) >= 0);
    if (matches.length > 0){
    let adiitionalCardId = index +1;
    const copies = originalsAndCopies[index];
    for(let match of matches){
        if (originalsAndCopies.length <= adiitionalCardId){
            originalsAndCopies.push(copies);
        }else{
            originalsAndCopies[adiitionalCardId] = originalsAndCopies[adiitionalCardId] +copies;
        }
        adiitionalCardId++;
    }
    //console.log(originalsAndCopies); 
}
    
});
console.log(originalsAndCopies.reduce ((sum, current) => sum + current, 0));
}

part2(text);