import type { Request, Response } from "express";
import { loginUser, AuthError } from "./auth.service.js";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son obligatorios" });
  }

  try {
    const { token, user } = await loginUser(email, password);
    return res.status(200).json({
      message: "Login exitoso",
      token,
      user,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}