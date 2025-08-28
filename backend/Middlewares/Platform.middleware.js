const authorizePlatform = (platformName) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "User key not authenticated.",
      });
    }

    if (req.user.platform !== platformName) {
      return res.status(402).send({
        status: false,
        message: "Forbidden access, insufficient privileges.",
      });
    }

    next();
  };
};

export default authorizePlatform;
