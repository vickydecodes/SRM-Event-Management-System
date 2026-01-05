import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@db/models/user.model.js";

export const login = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
    deleted: false,
    active: true,
  }).select("+password");

  if (!user) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: "Invalid credentials" };
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return {
    token,
    role: user.role,
    userId: user._id,
  };
};
