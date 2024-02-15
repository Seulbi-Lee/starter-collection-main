console.log("hello world")

class User {
  public username: string;  // 기본은 public
  private name: string;     // class 안에서만 사용 가능
  private birthYear: number;

  constructor(_username: string, _name: string, _birthYear: number) {
    this.username = _username;
    this.name = _name;
    this.birthYear = _birthYear;
  }

}

const user1 : User = new User("s", "Seulbi", 1989);
const user2 : User = new User("a", "Ari", 1994);

console.log(user1.username);