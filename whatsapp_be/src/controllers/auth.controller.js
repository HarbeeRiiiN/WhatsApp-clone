export const register = async (req, res, next) => {
  try {
    console.log("* ckp");
    console.log(req.body);
    res.send(req.body);
  } catch (error) {
    res.status(500).json(next(error));
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
