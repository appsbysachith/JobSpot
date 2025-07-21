const express = require("express");
const router = express.Router();
const Job = require("../models/job");

// POST a new job
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to create job" });
  }
});

// GET all jobs (latest first)
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    console.log("✅ Jobs fetched:", jobs.length); // 🔥 Add this
    res.json(jobs);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
