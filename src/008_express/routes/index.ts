import express from 'express';
import { DatabaseError, Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432
});
console.log("DB Pool create");

export const apiRouter = express.Router();  // Router 분리(app.get)

// app.get("/api", async (req, res) => {
//  // transaction 없이 한가지 동작만을 수행할 경우, 그냥 한 줄로 적어주면 됨. 이렇게 한 줄 안에 다 적으면 begin, commit, rollback, release()까지 포함된 코드가 됨.
//   await pool.query("SELECT * FROM users");
//   res.send("hello");
// });

// app.get("/api", async (req, res) => {  // DB 데이터 가져오기
//   // transaction을 쓸거면 await pool.connect()를 변수에 담고 try catch finally 에 BEGIN,COMMIT,ROLLBACK 넣어주고, release() 까지 써줘야함.
//   const client = await pool.connect();
//   try {
//     await client.query("BEGIN");
//     const { rows } = await client.query("SELECT * FROM users");
//     await client.query("COMMIT");
//     res.send(rows);
//   } catch(e) {
//     await client.query("ROLLBACK");
//     throw e;
//   } finally {
//     client.release();
//   }
// });


// signup
apiRouter.post("/signup", async (req, res) => {  
  const username = req.body["username"];
  const password = req.body["password"];

  try {
    const result = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username", [
      username,
      password,
    ]);  // 우선 req로 받은 값을 db에 넣어보는데,
    res.cookie("auth", result.rows[0].id, {httpOnly: true, sameSite: "strict"}).send(result.rows[0].username);
  } catch(e) {
    // usename을 유니크 하게 만들기로 했기 때문에 같은 값을 넣으면, code: '23505'(unique_violation) 에러가 나게되고,
    if (e instanceof DatabaseError) {  // e 에러가 db 에러면,
      if (e.code === '23505') {  // 그중에서 23505 에러면,
        res.sendStatus(409);  // 409: conflict 충돌에러
        return;
      }
    }
    res.status(500).send(e); // 500 : Internal Server Error 서버 내부 오류
  }
});

// login
apiRouter.post("/login", async (req, res) => {  
  const {username, password} = req.body;

  try {
    const result = await pool.query("SELECT id, username FROM users WHERE username = $1 AND password = $2", [  // SELECT * FROM ~ -> 전체 , SELECT id FROM ~ -> id 가져오기 
      username,
      password,
    ]);

    if (result.rowCount !== 1) {
      res.sendStatus(401);  // 401: authentication 인식 오류, 403: authorization 권한 오류
      return;
    }

    // res.cookie(key, value, {option})형태 / httpOnly: true => js로 접근 안됨(document.cookie로 접근 불가)
    res.cookie("auth", result.rows[0].id, {httpOnly: true, sameSite: "strict"}).send(result.rows[0].username);
  } catch(e) {
    res.status(500).send(e);
  }
});

// logout
apiRouter.post("/logout", async (req, res) => {
  res.clearCookie("auth").send();
});



// authentication middleware 이거 위치 중요함. 이 아래로는 인증이 필요한 코드는 이 아래로 쓰여야 함
// cookie로 user 확인
apiRouter.use(async (req, res, next) => {
  const { auth } = req.cookies;
  
  if (!auth) {
    console.error("auth cookie not found");
    res.clearCookie("auth").sendStatus(401);
    return;
  }
  
  try {
    const result = await pool.query("SELECT id FROM users WHERE id = $1", [auth]);
  
    if (result.rowCount !== 1) {
      console.error("auth cookie not found");
      res.clearCookie("auth").sendStatus(401);
      return;
    }
    
    next(); // middleware 에서 user 확인 하고, 확인 되면 다음작업으로 넘어감
  } catch(e) {
    console.error("auth cookie not found");
    res.clearCookie("auth").sendStatus(401);
    return;
  }
});

// checkCredential
apiRouter.post("/checkCredential", async (req, res) => {
  const { auth } = req.cookies;
  const result = await pool.query("SELECT username FROM users WHERE id = $1", [auth]);

  res.send(result.rows[0].username);
});

// addTodo
apiRouter.post("/addTodo", async (req, res) => {
  const { auth } = req.cookies;
  const {date, todo} = req.body;
 
  try {
    await pool.query("INSERT INTO todos (user_id, date, todo) VALUES ($1, $2, $3)", [auth, date, todo]);
    res.send();
  } catch(e) {
    res.status(500).send(e);
  }
});

// getTodo
apiRouter.post("/getAllTodo", async (req, res) => {
  const { auth } = req.cookies;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query("SELECT TO_CHAR(date, 'yyyy-mm-dd'), todo FROM todos WHERE (user_id) = $1", [auth]);
    await client.query("COMMIT");
    res.send(rows);
  } catch(e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
});

// deleteTodo
apiRouter.post("/delTodo", async (req, res) => {
  const { auth } = req.cookies;
  const { date, todo } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query("SELECT id FROM todos WHERE (user_id) = $1 AND (date) = $2 AND (todo) = $3", [auth, date, todo]);
    const selectedTodo = rows[0].id;
    await client.query("DELETE FROM todos WHERE (id) = $1", [selectedTodo]);
    await client.query("COMMIT");
    res.sendStatus(200);
  } catch(e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
});