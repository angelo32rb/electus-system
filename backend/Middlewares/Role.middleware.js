const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "User not authenticated.",
      });
    }

    if (req.user.rank !== role) {
      return res.status(402).send({
        status: false,
        message: "Forbidden access, insufficient privileges.",
      });
    }

    next();
  };
};

export default authorizeRole;
