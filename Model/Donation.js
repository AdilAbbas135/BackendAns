const mongoose = require("mongoose");
const { Schema } = mongoose;
const DonationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    RecieverId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    OfferingId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    StripeDetails: {
      type: Object,
    },
  },
  { timestamps: true }
);
const DonationModel = mongoose.model("donations", DonationSchema);
module.exports = DonationModel;
