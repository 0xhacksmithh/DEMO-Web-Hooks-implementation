import express from "express";

const app = express();

app.use(express.json());

let dataBase = [];

app.get("/", (req, res) => {
  res.send({ messgae: "Hello From Sender Server...." });
});

app.post("/registerHooks", (req, res) => {
  const { url, token, event } = req.body;
  console.log(`URL :: ${url}  Token :: ${token}  Event :: ${event}`);

  dataBase.push({
    id: Date.now().toString(),
    url,
    token,
    event,
  });

  res.send({ message: "Your Hook Registered Sucessfully" });
});

app.post("/activateHook", (req, res) => {
  const { name, email } = req.body;
  sendInfoToRegisteredServer(name, email);

  res.send({
    message: "Hook Activation Sucess, Info Sent to Registered Servers",
  });
});

async function sendInfoToRegisteredServer(name, email) {
  const payload = { name, email };

  await fetch(dataBase[0].url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Webhook-Token": dataBase[0].token,
    },
    body: JSON.stringify(payload),
  });
}

app.listen(3000, () => {
  console.log("Sender-Server Running On Port :: 3000");
});
