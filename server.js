const express = require("express");

const app = express();

app.use(express.static("./dist/enouvo-staff-minigame"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/enouvo-staff-minigame/src/" })
);

app.listen(process.env.PORT || 8080);
