import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ messgae: "Hellow from Receiver Server...." });
});

app.post("/webhook", (req, res) => {
  const { name, email } = req.body;

  console.log(`Name :: ${name}    Email :: ${email}`);
});

app.listen(4000, () => {
  console.log("Receiver-Server Running On Port :: 4000");
});
