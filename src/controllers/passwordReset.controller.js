// Importaciones de módulos
import nodemailer from "nodemailer";
import crypto from "crypto";
import CustomError from "../errors/CustomErrors.js";
import UserModel from "../dao/models/users.js";

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  // Configuración del transportador (reemplaza con tu configuración)
});

// Objeto para almacenar tokens y sus fechas de creación
const resetTokens = {};

// Duración del token (en milisegundos)
const TOKEN_EXPIRATION = 3600000; // 1 hora

// Función para generar un token
const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

// Controlador para solicitar el restablecimiento de la contraseña
export const requestReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new CustomError({
        name: "UserNotFoundError",
        message: "No user found with the provided email address",
      });
    }

    const token = generateToken();
    resetTokens[token] = { userId: user._id, createdAt: Date.now() };

    const resetUrl = `http://localhost:8080/reset/${token}`;

    const mailOptions = {
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    await transporter.sendMail(mailOptions);

    res.send({
      status: "success",
      message: "Password reset email has been sent",
    });
  } catch (error) {
    next(error);
  }
};

// Controlador para verificar el token
export const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.params;
    const resetToken = resetTokens[token];

    if (!resetToken) {
      throw new CustomError({
        name: "InvalidTokenError",
        message: "Invalid or expired token",
      });
    }

    const { createdAt } = resetToken;
    const elapsedTime = Date.now() - createdAt;

    if (elapsedTime > TOKEN_EXPIRATION) {
      // Token expirado, se debe redirigir a una vista para generar un nuevo correo de restablecimiento
      res.redirect("/generate-reset-email");
      return;
    }

    // Token válido, se debe redirigir a una vista para restablecer la contraseña
    res.redirect(`/reset/${token}`);
  } catch (error) {
    next(error);
  }
};

// Controlador para restablecer la contraseña
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const resetToken = resetTokens[token];

    if (!resetToken) {
      throw new CustomError({
        name: "InvalidTokenError",
        message: "Invalid or expired token",
      });
    }

    const { userId, createdAt } = resetToken;
    const elapsedTime = Date.now() - createdAt;

    if (elapsedTime > TOKEN_EXPIRATION) {
      // Token expirado, se debe redirigir a una vista para generar un nuevo correo de restablecimiento
      res.redirect("/generate-reset-email");
      return;
    }

    // Validar si el usuario intenta restablecer la contraseña con la misma contraseña actual
    const user = await UserModel.findById(userId);

    if (user && user.isValidPassword(password)) {
      throw new CustomError({
        name: "SamePasswordError",
        message: "Cannot use the same password as the current one",
      });
    }

    // Actualizar la contraseña del usuario y eliminar el token
    user.password = password;
    await user.save();
    delete resetTokens[token];

    res.send({
      status: "success",
      message: "Password has been reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Exportación de los controladores
export default {
  requestReset,
  verifyToken,
  resetPassword,
};
