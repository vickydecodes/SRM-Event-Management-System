import bcrypt from "bcryptjs";
import User from "@db/models/user.model.js";

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@srm.edu";
  const adminPassword = process.env.ADMIN_PASSWORD || "ADMIN@123";

  const existingAdmin = await User.findOne({
    email: adminEmail,
    role: "ADMIN",
  });

  if (existingAdmin) {
    console.log("✅ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "ADMIN",
    active: true,
    deleted: false,
  });

  console.log("🚀 Admin created successfully");
};

export default seedAdmin;
