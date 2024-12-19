import ProfileModel from "../models/ProfileModel.js";
import UserModel from "../models/UserModel.js";
import sendEmail from "../utility/emailUtility.js";
import { encodeToken } from "../utility/tokenUtility.js";

export const UserOtpService = async (req, res) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailText = "Your OTP is " + code;
    let EmailSubject = "OTP Verification";
    await sendEmail(email, EmailText, EmailSubject);
    await UserModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );
    return { status: "success", message: "OTP has been sent successfully" };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const VerifyOtpService = async (req, res) => {
  try {
    let email = req.params.email;
    let otp = req.params.otp;
    let data = await UserModel.findOne({ email: email });
    if (data.otp === otp) {
      let user_id = data._id.toString();

      //generate token
      let token = encodeToken(email, user_id);

      //OTP update to 0
      await UserModel.updateOne(
        { email: email },
        { $set: { otp: 0 } },
        { upsert: true }
      );

      //set token in response cookie
      let cookieOptions = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      };
      res.cookie("token", token, cookieOptions);

      return { status: "success", message: "OTP is verified", token: token };
    } else {
      return { status: "failed", message: "Invalid OTP" };
    }
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const LogoutService = async (req, res) => {
  try {
    //set token in response cookie
    let cookieOptions = {
      expires: new Date(Date.now() - 24 * 60 * 60 * 1000),
    };
    res.cookie("token", "", cookieOptions);

    return { status: "success", message: "Logout is successfully done" };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const SaveProfileService = async (req, res) => {
  try {
    let reqBody = req.body;
    let user_id = req.headers.user_id;
    reqBody["userID"] = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return {
      status: "success",
      message: "Profile has been saved successfully",
    };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const ReadProfileService = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    let data = await ProfileModel.findOne({ userID: user_id });
    return { status: "success", data: data };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const AllUsersReadProfilesService = async (req, res) => {
  try {
    let data = await ProfileModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};

export const DeleteProfileService = async (req, res) => {
  try {
    let user_id = req.headers.user_id;
    await ProfileModel.deleteOne({ userID: user_id });
    return { status: "success", message: "Profile has been deleted" };
  } catch (error) {
    return {
      status: "failed",
      message: "something went wrong",
    };
  }
};
