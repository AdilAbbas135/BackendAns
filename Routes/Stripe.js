const express = require("express");
const DonationModel = require("../Model/Donation");
const VerifyToken = require("../Middlewear/VerifyToken");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Create Product at localhost:5000/api/buy/payment
router.post("/payment", VerifyToken, async (req, res) => {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "USD",
      },
      async (StripeErr, StripeRes) => {
        if (StripeErr) {
          res.status(404).json(StripeErr);
        } else {
          await DonationModel.create({
            userId: req.user.profileId,
            RecieverId: req.body.RecieverId,
            OfferingId: req.body.OfferingId,
            StripeDetails: StripeRes,
          });
          return res.status(200).json({ msg: "Donation Made Successfully" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
