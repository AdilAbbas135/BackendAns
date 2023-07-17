const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const OfferingSchema = new mongoose.Schema(
  {
    name: { type: String },
    slug: { type: String },
    ncOfferingId: { type: String },
    issuerId: { type: Schema.Types.ObjectId },
    organizationId: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    target: { type: Number },
    minimumInvestment: { type: Number },
    maxInvestment: { type: Number },
    pledged: { type: Number },
    PricePerUnit: { type: Number },
    industry: { type: String },
    description: { type: String },
    shortDescription: { type: String },
    disclosure: { type: String },
    issueType: { type: String },
    summary: { type: String },
    statusId: { type: String },
    Status: { type: String },
    featuredImage: { type: String },
    logoImage: { type: String },
    bannerImage: { type: String },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const OfferingModel = mongoose.model("Offering", OfferingSchema);
module.exports = OfferingModel;
