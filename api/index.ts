import express from 'express';
import notationRouter from "./routes/notation";

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use('/notations', notationRouter);

app.listen(port, () => {
  console.log("We r online port: " + port);
});