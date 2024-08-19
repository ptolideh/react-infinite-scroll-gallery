import express, { Request, Response } from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get("/api/pexels", async (req: Request, res: Response) => {
  try {
    console.log("Request received for /api/pexels");
    const apiUrl = process.env.PEXEL_API_URL;
    if (!apiUrl) {
      throw new Error("PEXEL_API_URL is not defined in environment variables");
    }

    const queryParams = new URLSearchParams(
      req.query as Record<string, string>
    ).toString();
    const fullUrl = `${apiUrl}?${queryParams}`;
    console.log(`Full URL: ${fullUrl}`);

    const apiKey = process.env.PEXEL_API_KEY;
    if (!apiKey) {
      throw new Error("PEXEL_API_KEY is not defined in environment variables");
    }

    const response = await fetch(fullUrl, {
      headers: {
        Authorization: `${apiKey}`,
      },
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${responseText}`
      );
    }

    const data = JSON.parse(responseText);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: error.message || "An unknown error occurred" });
    } else {
      res.status(500).json({ error: JSON.stringify(error) });
    }
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
