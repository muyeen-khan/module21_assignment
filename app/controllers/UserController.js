import {
  AllUsersReadProfilesService,
  DeleteProfileService,
  LogoutService,
  ReadProfileService,
  SaveProfileService,
  UserOtpService,
  VerifyOtpService,
} from "../services/UserServices.js";

export const UserRegisterOtp = async (req, res) => {
  let result = await UserOtpService(req);
  return res.status(200).json(result);
};

export const VerifyLogin = async (req, res) => {
  let result = await VerifyOtpService(req, res);
  return res.status(200).json(result);
};

export const UserLogout = async (req, res) => {
  let result = await LogoutService(req, res);
  return res.status(200).json(result);
};

export const CreateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};

export const UpdateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};

export const ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.status(200).json(result);
};

export const AllUsersReadProfiles = async (req, res) => {
  let result = await AllUsersReadProfilesService(req);
  return res.status(200).json(result);
};

export const DeleteProfile = async (req, res) => {
  let result = await DeleteProfileService(req);
  return res.status(200).json(result);
};
