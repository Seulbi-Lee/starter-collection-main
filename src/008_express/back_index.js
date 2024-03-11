const express = require('express'); // express 불러오기
const app = express(); // express 사용
const port = 8080;
const path = require('path');

// http 서버 실행
app.listen(port, () => {
  console.log(`서버 실행 ${port}`);
});

// react 연결
// // 아래와 같이 쓰려면 이 코드가 필요함
// app.use(express.static(path.join(__dirname, '../../react-calendar/build'))); // '경로' 안에 있는 static file 갖다 씀
// // http://localhost:3000/로 접근하면
// app.get('/', (req, res) => { 
//   res.sendFile(path.join(__dirname, '../../react-calendar/build/index.html')); // '경로'를 보여줘라
// });



// db 연결
// pg 모듈 
// import { Client } from 'pg';
const { Client } = require('pg');
// 객체생성
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432
});
// 연결 확인
// await client.connect();
client.connect(err => {
  if (err) console.log(err);
  else console.log('DB 연결 성공');
});
// 데이터 가져오기
client.query(`SELECT * FROM users`, (err, res) => {
  if (!err){
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  client.end();
});

