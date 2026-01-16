import bcrypt from "bcryptjs";
import User from "@db/models/user.model.js";
import { generateToken, verifyToken } from '@utils/jwt.js';
import { ApiError } from '@core/errors/api.error.js';
import { Types } from 'mongoose';

interface DecodedToken {
  id: string;
  loginId?: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface ReturnedUser {
  _id: Types.ObjectId;
  role: string;
  token: string;
  [key: string]: any;
}

export const login = async (email: string, password?: string) => {
  
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new ApiError(404, 'User not found');

  if (!password) throw new ApiError(400, 'Password required');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new ApiError(401, 'Invalid password');

  const payload = {
    id: user._id,
    loginId: user._id,
    role: user.role || 'user',
  };

  return {
    user: {
      ...user.toObject(),
      role: user.role || 'user',
    },
    token: generateToken(payload),
  };
};

// export const adminResetPassword = async (data: {
//   adminId: string;
//   adminRole: string;
//   targetId: string;
//   targetRole: string;
//   newPassword: string;
// }) => {
//   const { adminRole, targetId, targetRole, newPassword } = data;

//   if (!adminRole || !targetId || !targetRole || !newPassword) {
//     throw new ApiError(400, 'All fields are required');
//   }

//   if (!['super_admin', 'junior_admin'].includes(adminRole)) {
//     throw new ApiError(403, 'Not allowed to reset passwords');
//   }

//   const Model = targetRole === 'student' ? studentModel : User;

//   const user = await (Model as any).findById(targetId);
//   if (!user) throw new ApiError(404, 'Target user not found');

//   user.password = newPassword;
//   await user.save();

//   return {
//     message: 'Password reset successfully',
//   };
// };

// export const changePassword = async (data: {
//   userId: string;
//   role: string;
//   currentPassword: string;
//   newPassword: string;
// }) => {
//   const { userId, role, currentPassword, newPassword } = data;

//   if (!userId || !role || !currentPassword || !newPassword) {
//     throw new ApiError(400, 'All fields are required');
//   }

//   const Model = role === 'student' ? studentModel : User;

//   const user = await (Model as any).findById(userId).select('+password');
//   if (!user) throw new ApiError(404, 'User not found');

//   const valid = await bcrypt.compare(currentPassword, user.password);
//   if (!valid) throw new ApiError(401, 'Current password incorrect');

//   user.password = newPassword;
//   await user.save();

//   return {
//     message: 'Password updated successfully',
//   };
// };

export const getCurrentUser = async (token: string): Promise<ReturnedUser> => {
  if (!token) throw new ApiError(401, 'Token missing');

  let decoded: DecodedToken;

  try {
    decoded = verifyToken(token) as DecodedToken;
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }

  const { id, role } = decoded;

  const user = await User.findById(id).select('-password').lean();

  if (!user) throw new ApiError(404, 'User not found');

  return {
    ...user,
    _id: user._id as Types.ObjectId,
    role: user.role || role || 'user',
    token,
  };
};

export const logout = async () => {
  return { message: 'Logged out successfully' };
};
