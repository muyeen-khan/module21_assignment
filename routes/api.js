import express from "express";
import {
  AllUsersReadProfiles,
  CreateProfile,
  DeleteProfile,
  ReadProfile,
  UpdateProfile,
  UserLogout,
  UserRegisterOtp,
  VerifyLogin,
} from "../app/controllers/UserController.js";
import authMiddleware from "../app/middlwares/authMiddleware.js";
const router = express.Router();

//User Routes
router.get("/UserRegisterOtp/:email", UserRegisterOtp);
router.get("/verifyLogin/:email/:otp", VerifyLogin);
router.get("/UserLogout", authMiddleware, UserLogout);

router.post("/CreateProfile", authMiddleware, CreateProfile);
router.post("/UpdateProfile", authMiddleware, UpdateProfile);
router.get("/ReadProfile", authMiddleware, ReadProfile);
router.get("/AllUsersReadProfiles", authMiddleware, AllUsersReadProfiles);

router.delete("/DeleteProfile", authMiddleware, DeleteProfile);

export default router;
