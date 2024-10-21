import { createUser } from "../services/auth.service.js";
export const register = async (req, res, next) => {
  try {
    // fetch fields we want
    const { name, email, picture, status, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json(next(error));
  }
};

export const logout = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json(next(error));
  }
};

export const refreshToken = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json(next(error));
  }
};
