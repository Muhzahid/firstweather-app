import express from "express";
import fs from "fs";
import csv from "csv-parser";

const router = express.Router();

router.get("/", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  let results = [];

  fs.createReadStream("data/cities.csv") // ✅ make sure file exists in backend/data
    .pipe(csv())
    .on("data", (row) => {
      if (row.name.toLowerCase().startsWith(query)) {
        results.push(`${row.name}, ${row.country}`);
      }
    })
    .on("end", () => {
      res.json(results.slice(0, 10)); // return top 10 suggestions
    });
});

export default router;
