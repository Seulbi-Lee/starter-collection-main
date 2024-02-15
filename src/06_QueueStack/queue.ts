import { Queue } from "./module";

async function main() {
  const queue  = new Queue();
  queue.enqueue(1);
  queue.print();
  queue.enqueue(2);
  queue.enqueue(3);
  queue.print();
  queue.dequeue();
  queue.print();
  queue.enqueue(4);
  queue.print();
}

main();