const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const pool = require("../db");

const router = express.Router();
let csvCodes = new Map();

// 1. Load Local CSV Backup for fallback
const loadCodes = () => {
  const filePath = path.join(__dirname, "../data/obd-trouble-codes.csv");
  if (!fs.existsSync(filePath)) return;
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const lines = data.split("\n");
    lines.shift(); 
    lines.forEach((line) => {
      const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (parts && parts.length >= 2) {
        const code = parts[0].replace(/"/g, "").trim().toUpperCase();
        const title = parts.slice(1).join(",").replace(/"/g, "").trim();
        csvCodes.set(code, { code, title });
      }
    });
  } catch (err) {
    console.error("CSV Load Error:", err.message);
  }
};
loadCodes();

// 2. Main Diagnosis Route
router.get("/:code", async (req, res) => {
  const code = req.params.code.trim().toUpperCase();
  const vehicle = req.query.vehicle || "Standard Vehicle";

  try {
    // STEP A: Check Database for existing entries
    const dbResult = await pool.query("SELECT * FROM obd_codes WHERE code = $1", [code]);
    
    if (dbResult.rows.length > 0) {
      return res.json({ 
        ...dbResult.rows[0], 
        source: "database" 
      });
    }

    // STEP B: AI Analysis - Strict Specificity Instructions
    const aiResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an expert mechanic explaining car parts to a child. 
            You MUST be very specific about exactly WHICH part is broken based on the code.
            
            RULES:
            - title: Be specific. If the code mentions Cylinder 4, mention 'the 4th part'. For injectors, use 'juice sprayer' (e.g., 'The 4th juice sprayer is not giving fuel to the 4th piston').
            - cause: Explain why that exact specific part failed in simple words.
            - fix: Explain what the mechanic will do to that specific part.
            - severity: Use only 'Low', 'Medium', or 'High'.
            
            Return ONLY a JSON object with keys: "title", "cause", "fix", "severity". 
            Use simple words, but NEVER remove the specific part number or location mentioned in the code description.`
          },
          {
            role: "user",
            content: `Explain OBD code ${code} for a ${vehicle} specifically but simply.`
          }
        ],
        response_format: { type: "json_object" }
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const result = JSON.parse(aiResponse.data.choices[0].message.content);

    // STEP C: Save New Entry (Using UPSERT to overwrite old general descriptions)
    await pool.query(
      `INSERT INTO obd_codes (code, title, cause, fix, severity) 
       VALUES ($1, $2, $3, $4, $5) 
       ON CONFLICT (code) 
       DO UPDATE SET 
         title = EXCLUDED.title, 
         cause = EXCLUDED.cause, 
         fix = EXCLUDED.fix, 
         severity = EXCLUDED.severity`,
      [code, result.title, result.cause, result.fix, result.severity]
    );

    res.json({ 
      code, 
      ...result, 
      source: "AI Engine" 
    });

  } catch (error) {
    console.error("AI/DB Error:", error.message);
    
    const csvMatch = csvCodes.get(code);
    res.json({ 
      code,
      title: csvMatch ? csvMatch.title : "The car's computer is having a mystery moment.",
      cause: "The computer couldn't find a specific reason, but it's time for a check-up.",
      fix: "Ask a grown-up to take the car to a mechanic friend.",
      severity: "Medium",
      source: "Backup System"
    });
  }
});

module.exports = router;