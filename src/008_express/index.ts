import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import { apiRouter } from './routes';

const app = express();
// node middleware
app.use(morgan('dev')); // 요청과 응답에 대한 정보를 콘솔에 기록
app.use(express.json({ strict:false }));  // json parse
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(hpp());
app.use(helmet());
app.use(compression());

// apiRouter 라고 routes 폴더 안에 저장된 변수를 "/api"경로를 붙여서 사용
app.use("/api", apiRouter);

// 웹 서버에 올린 서버 dotenv에 port가 있으면 그걸 쓰고 없으면 로컬8000
const port:number = +process.env.PORT || 8080;

// 서버 실행
app.listen(port, () => {
  console.log({port})
});

