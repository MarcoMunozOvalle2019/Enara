const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const indexRoutes = require("./indexRoutes/routes");

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRoutes);

app.set("port", process.eventNames.port || 80);
app.set("views", path.join(__dirname, "views"));
app.listen(app.get("port"), () => {
  console.log("...server sample is listening");
});
