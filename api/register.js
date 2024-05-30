import { methods as authentication } from "../controllers/authentication.controller.js";

export default async (req, res) => {
  if (req.method === "POST") {
    await authentication.register(req, res);
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
};
