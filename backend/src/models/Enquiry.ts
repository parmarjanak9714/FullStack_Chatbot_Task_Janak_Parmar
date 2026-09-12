import mongoose, { Schema, Document } from "mongoose";

export interface IEnquiry extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "New" | "Contacted" | "Resolved";
}

const enquirySchema = new Schema<IEnquiry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Resolved"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model<IEnquiry>("Enquiry", enquirySchema);

export default Enquiry;