const express = require("express");
const AdminModel = require("../Model/Admin");
const router = express.Router();
const jwt = require("jsonwebtoken");
const VerifyToken = require("../Middlewear/VerifyToken");
const ProfileModel = require("../Model/Profile");
const DonationModel = require("../Model/Donation");
const OfferingModel = require("../Model/Offering");

// ROUTE 1 : Login User with Email and password
router.post("/login", async (req, res) => {
  try {
    const User = await AdminModel.findOne({
      Email: req.body.email,
      Password: req.body.password,
    });
    if (User) {
      // const password = await bcrypt.compare(req.body.password, User.Password);

      const authtoken = jwt.sign(
        {
          userId: User?._id,
          email: User?.Email,
          role: "admin",
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        success: true,
        msg: "Login Sucessfull",
        token: authtoken,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, msg: "Wrong Credentials! Try Again" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: "Internal Server Error" });
  }
});

router.post("/find-profile", VerifyToken, async (req, res) => {
  try {
    if (req.method === "POST") {
      console.log("request recieved");
      try {
        const Profile = await AdminModel.findOne({
          _id: req.user?.userId,
        });
        const TotalUsers = await ProfileModel.count();
        const TotalProblemsPosted = await OfferingModel.count();
        const Donations = await DonationModel.find();
        let TotalDonations = 0;
        for (let index = 0; index < Donations.length; index++) {
          TotalDonations =
            TotalDonations + Donations[index]?.StripeDetails?.amount_captured;
        }
        const authtoken = jwt.sign(
          {
            userId: Profile?._id,
            email: Profile?.Email,
            role: "admin",
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1d" }
        );

        if (Profile) {
          res
            .status(200)
            .json({
              Profile,
              authtoken,
              TotalDonations,
              TotalUsers,
              TotalProblemsPosted,
            });
        } else {
          res.status(404).json({
            Success: false,
            error: "Access Denied",
          });
        }
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: "Internal Server Error",
          errorMessage: error.message,
        });
      }
    } else {
      res.status(404).json({
        Success: false,
        error: "Access Denied",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
