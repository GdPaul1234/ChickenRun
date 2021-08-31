import {Chicken} from "../../models/chicken.mjs";

let chicken = new Chicken("Alice",5);
console.log(chicken, '\n');

let veryBadChicken = new Chicken();
console.log(veryBadChicken, '\n');

let badChicken = new Chicken("Alice");
console.log(badChicken, '\n');

chicken.birthday = new Date(2021,0,1);
console.log(chicken,'\n');

chicken.isRunning = true;
chicken.steps++;
console.log(chicken);

console.log(Chicken.parseChicken(chicken))
