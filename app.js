import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import articleRouter from "./routes/articleRouter.js";
import productRouter from "./routes/productRouter.js";
import commentRouter from "./routes/commentRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// JSON 요청 바디 파싱
app.use(express.json());

// 동적 CORS 설정
app.use((req, res, next) => {
  const allowedOrigins = {
    "http://localhost:3000": ["GET", "POST", "PATCH", "DELETE"], // 로컬에서 허용
    "https://sprint-fe-orcin.vercel.app": ["GET", "POST"], // Vercel에서 허용
  };

  const origin = req.header("Origin"); // 요청의 Origin 확인
  const methods = allowedOrigins[origin] || []; // Origin에 따른 허용 메서드 결정

  // CORS 미들웨어 실행
  cors({
    origin: Object.keys(allowedOrigins).includes(origin) ? origin : false, // 허용된 Origin만 설정
    methods, // Origin에 맞는 HTTP 메서드 허용
    credentials: true, // 인증 허용 (필요 시)
  })(req, res, next);
});

// 라우터 설정
app.use("/article", articleRouter);
app.use("/product", productRouter);
app.use("/comment", commentRouter);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 서버 실행
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
