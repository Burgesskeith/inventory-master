import express from "express";
const app = express();

const port = 1234;
import "./dbConnect.js";
import productRouter from "./controllers/products/index.js";
import userRouter from "./controllers/user/index.js";

app.use(express.json());
app.use(express.static("build"));

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log("Server started at ", port);
});
