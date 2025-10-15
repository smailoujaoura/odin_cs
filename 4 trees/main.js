import Tree from "./Tree.js";

const tree = new Tree();
tree.insertArray([1,2,3]);
Tree.prettyPrint(tree.root);
// tree.insert(30);
// Tree.prettyPrint(tree.root);

// tree.levelOrderForEach(console.log);
// console.log(tree.find(1));
console.log(tree.height(2));