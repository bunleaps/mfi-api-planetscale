import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    return await addMicroFi(req, res);
  } else if (req.method === "GET") {
    return await readMicroFi(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function readMicroFi(req, res) {
  const body = req.body;
  try {
    const allMicros = await prisma.microFi.findMany();
    return res.status(200).json(allMicros, { success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Error reading from database", success: false });
  }
}

async function addMicroFi(req, res) {
  const body = req.body;
  try {
    const newEntry = await prisma.microFi.create({
      data: {
        microName: body.microName,
        microRange: body.microRange,
        microTerms: body.microTerms,
        microAssets: body.microAssets,
      },
    });
    return res.status(200).json(newEntry, { success: true });
  } catch (error) {
    console.error("Request error", error);
    res.status(500).json({ error: "Error creating question", success: false });
  }
}
