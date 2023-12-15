import express = require("express");
import bodyParser = require("body-parser");

const app = express();
const port = 3333;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.post("/tradingView", (req, res) => {
  const action = req.body;
  console.log(action);
  res.sendStatus(200);
});

app.listen(port || 3000, () => console.log(`Listening on ${port}`));
