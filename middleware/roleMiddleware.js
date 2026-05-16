const adminOnly = (req, res, next) => {

  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Admin access only"
    });

  }

  next();

};

const ownerOnly = (req, res, next) => {

  if (req.user.role !== "owner") {

    return res.status(403).json({
      message: "Owner access only"
    });

  }

  next();

};

const renterOnly = (req, res, next) => {

  if (req.user.role !== "renter") {

    return res.status(403).json({
      message: "Renter access only"
    });

  }

  next();

};

module.exports = {
  adminOnly,
  ownerOnly,
  renterOnly
};