const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const parts = require("../../Chatbot/Dataset/parts.json");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ==============================
// MEMORY (single user)
let lastDetectedPart = null;

// ==============================
// HELPERS
const clean = (str = "") => str.toLowerCase().replace(/[^a-z]/g, "");

// Detect part from filename
const detectPart = (fileName) => {
  const cleanName = clean(fileName);

  return parts.find((part) =>
    cleanName.includes(clean(part.slug)) ||
    cleanName.includes(clean(part.part_name))
  );
};

// Fallback (never break UI)
const fallbackExplanation = (part) => {
  return `${part.part_name} is an important component in the ${part.category}. It helps the vehicle system function properly.`;
};

// ==============================
// ROUTE
router.post("/", async (req, res) => {
  try {
    const { fileName, message } = req.body;

    let detectedPart = null;

    // =========================
    // 1. IMAGE DETECTION
    if (fileName) {
      const match = detectPart(fileName);

      if (match) {
        detectedPart = match;
        lastDetectedPart = match;
      } else {
        return res.json({
          part_name: "Unknown Part",
          explanation: "Could not identify from dataset",
        });
      }
    }

    // =========================
    // 2. USE LAST PART FOR QUESTIONS
    if (!detectedPart && lastDetectedPart) {
      detectedPart = lastDetectedPart;
    }

    if (!detectedPart) {
      return res.json({
        part_name: "Unknown Part",
        explanation: "Please upload an image first.",
      });
    }

    // =========================
    // 3. QUESTION → INTENT-BASED AI
    if (message) {
      const msg = message.toLowerCase();

      let systemPrompt = "";
      let userPrompt = "";

      // ✅ FUNCTION TYPE
      if (msg.includes("function") || msg.includes("use")) {
        systemPrompt = `
You are an automotive expert.

Explain the FUNCTION (purpose) of a car part.

Rules:
- Only explain what it does
- Do NOT explain working steps
- Keep it simple
- Max 2–3 lines
`;

        userPrompt = `What is the function of ${detectedPart.part_name}?`;
      }

      // ✅ WORKING TYPE
      else if (msg.includes("how") || msg.includes("work")) {
        systemPrompt = `
You are an automotive engineer.

Explain HOW a car part works in real system flow.

Rules:
- Use step-by-step explanation
- Use "When..., then..." format
- Mention system flow (pedal → fluid → pressure → movement → friction)
- Max 3–5 steps
`;

        userPrompt = `Explain how ${detectedPart.part_name} works in a vehicle.`;
      }

      // ✅ DEFAULT TYPE
      else {
        systemPrompt = `
You are an automotive expert.

Explain both function and basic working briefly.
`;

        userPrompt = `Explain ${detectedPart.part_name} simply.`;
      }

      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.6,
          max_completion_tokens: 120,
        });

        const aiText =
          completion?.choices?.[0]?.message?.content?.trim();

        return res.json({
          part_name: detectedPart.part_name,
          explanation: `Category: ${detectedPart.category}\n\n${
            aiText || fallbackExplanation(detectedPart)
          }`,
        });

      } catch (err) {
        console.error("GROQ ERROR:", err.message);

        return res.json({
          part_name: detectedPart.part_name,
          explanation: `Category: ${detectedPart.category}\n\n${fallbackExplanation(
            detectedPart
          )}`,
        });
      }
    }

    // =========================
    // 4. ONLY IMAGE (NO QUESTION)
    return res.json({
      part_name: detectedPart.part_name,
      explanation: `Category: ${detectedPart.category}\n\nThis is a ${detectedPart.part_name}.`,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      part_name: "Error",
      explanation: "Server error",
    });
  }
});

module.exports = router;