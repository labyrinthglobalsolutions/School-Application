import mongoose from "mongoose";
import bcrypt from "bcrypt";
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export const Admin = mongoose.model("Admin", adminSchema);

export const createAdmin = async () => {
  const adminIsthere = await Admin.findOne({ email: "admin@gmail.com" });
  if (adminIsthere) {
    return;
  }
  const name = "saicharan";
  const email = "admin@gmail.com";
  const rawPassword = "12345678"; // The raw password to hash
  const saltRounds = 10; // Number of salt rounds for bcrypt

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

    // Create a new Admin instance with the hashed password
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    await admin.save();

    console.log("Admin created successfully");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};
