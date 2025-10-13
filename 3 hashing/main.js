import { HashMap } from "./HashMap.js";

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.get("hat"));
console.log(test.capacity);

console.log(test.size);
test.set("moon", "silver");

console.log(test.capacity);
console.log(test.get("moon"));
console.log(test.get("apple"));

console.log(test.size);

console.log(test.has("kite"));
test.remove("kite");
console.log(test.has("kite"));

console.table(test.entries());
test.clear();
console.log(test.capacity);