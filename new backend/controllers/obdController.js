const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Load CSV into memory once when the server starts
let obdCodes = new Map();
const filePath = path.join(__dirname, "../data/obd-trouble-codes.csv");
const data = fs.readFileSync(filePath, "utf-8");
data.split("\n").slice(1).forEach(line => {
    const parts = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    if (parts && parts.length >= 2) {
        const code = parts[0].replace(/"/g, "").trim().toUpperCase();
        const title = parts.slice(1).join(",").replace(/"/g, "").trim();
        obdCodes.set(code, { code, title });
    }
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getObdCode = async (req, res) => {
    try {
        const code = req.params.code.trim().toUpperCase();
        const vehicle = req.query.vehicle || "General Vehicle";

        // 1. Check local Map (CSV data)
        const localMatch = obdCodes.get(code);
        if (localMatch) {
            return res.json({ ...localMatch, source: "Local Database" });
        }

        // 2. Fallback to AI if code is missing from CSV
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Define OBD-II code ${code} for a ${vehicle}. Provide a short, professional mechanical description.`;
        
        const result = await model.generateContent(prompt);
        const description = result.response.text();

        res.json({
            code: code,
            title: description,
            source: "AI Engine"
        });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving code info" });
    }
};