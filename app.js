const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.status === 400 || err.status === 404) {
    if (err.field === "name") {
      next({ status: 400, field: "name" });
    } else if (err.field === "email") {
      next({ status: 400, field: "email" })
    } else {
      res.status(err.status).json({ message: `missing required ${err.field} field` });
    }
  } else {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
