import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(cors());

// simple route
app.get("/", (_, res: Response) => {
  res.json({ message: "Welcome to Web-Store-Test-App server." });
});

/**
 * Transaction Confirmation
 */
let tcPayload = {};
app.post("/transaction-confirmation", (req: Request, res: Response) => {
  tcPayload = req.body;
  console.log("post", tcPayload);
  res.status(200).json({});
});

app.get("/transaction-confirmation", (req, res) => {
  console.log("get", tcPayload);
  res.status(200).json(tcPayload);
});

// set port, listen for requests
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
