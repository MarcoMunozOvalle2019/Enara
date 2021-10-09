const express = require("express");
const router = express.Router();
const execute = require("../src/app/components/sample/sample.consumerTime");

router.post("/api/start", async (req, res) => {
  const output = await execute.On(req);
  res.json(output);
});

router.put("/api/end", async (req, res) => {
  const output = await execute.Off(req);
  res.json(output);
});

router.get("/api/reports", async (req, res) => {
  const output = await execute.reports(req);
  res.json(output);
});
router.get("/api/reports/:proyectId", async (req, res) => {
  const output = await execute.report(req);
  res.json(output);
});

module.exports = router;
