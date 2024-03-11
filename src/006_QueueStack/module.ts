// stack
export class Stack {
  private result: number[];

  constructor() {
    this.result = [];
  }

  public push(number: number) {
    return this.result.push(number);
  }
  public pop() {
    this.result.pop();
  }
  public print() {
    console.log(this.result);
    // return this.result;
  }
}

// export class Queue {
//   private headIndex;
//   private tailIndex;
//   private result;

//   constructor() {
//     this.headIndex = 0;
//     this.tailIndex = 0;
//     this.result = {};
//   }

//   public enqueue(item) {
//     this.result[this.tailIndex] = item;
//     this.tailIndex++;
//   }

//   public dequeue() {
//     const item = this.result[this.headIndex];
//     delete this.result[this.headIndex];
//     return item;
//   }

//   public print() {
//     console.log(this.result);
//   }
// }

// node 생성
export class Node {
  private data: number;
  private next: number;

  constructor(_data: number) {
    this.data = _data;  // node 값
    this.next = null;   // 다음 node 참조
  }
}
// queue
export class Queue {
  private head;
  private tail;

  constructor() {
    this.head = null;   // 첫번째 노드
    this.tail = null;   // 마지막 노드
  }

  public enqueue(data) {
    const newNode = new Node(data);   // 새로운 노드 만들고

    if (this.head === null) {    // 큐가 null 이면
      this.head = newNode;       // head, tail 다 새 노드로 설정
      this.tail = newNode;
    } else {                     // 큐가 null이 아니면,
      this.tail.next = newNode;  // tail.next를 새 노드를 가리키도록, tail 이 새 노드가 됨
      this.tail = newNode;
    }
  }

  public dequeue() {
    if (this.head === null) {   // 큐가 null 이면 결과는 null
      return null;
    }
    const removeNode = this.head;   // removeNode는 첫번째 노드
    this.head = this.head.next;     // 첫번째 노드를 두번째 노드로 설정
    return removeNode.data;   // 삭제된 데이터 리턴
  }

  public print() {
    const result = [];  // 결과 받은 빈 배열
    let current = this.head;  // 현재 첫번째

    while (current !== null) {  // current가 엾을 때 까지
      result.push(current.data);  // current의 data를 배열에 push
      current = current.next;   // current를 next로 교체
    }

    console.log(result);
  }
}