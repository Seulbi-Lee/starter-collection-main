import { Stack } from "./module";

async function main() {
  const stack  = new Stack();
  stack.push(1);
  stack.push(2);
  stack.pop();
  stack.push(3);
  stack.print();
}

main();