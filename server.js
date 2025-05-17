import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;   // EB/EC2 will set PORT env var

app.use(express.json());

let latest = "no data yet";              // in‑memory store


app.post("/api/create-answer", (req, res) => {
    const { data } = req.body;
    if (typeof data !== "string") {
        return res.status(400).json({ error: "data must be string" });
    }
    latest = data;
    return res.json({ ok: true });
});

app.get("/answer", (_, res) => {
    res.type("html").send(`
    <!doctype html>
    <html lang="en">
      <head><meta charset="utf-8"><title>Answer</title></head>
      <body style="font-family:sans-serif;padding:32px">
        <h1>Most recent data:</h1>
        <span id="answer">${latest}</span>
      </body>
    </html>
  `);
});

app.get("/", (_, res) => res.redirect("/answer"));

app.listen(PORT, () => console.log(`▶  Listening on http://localhost:${PORT}`));
