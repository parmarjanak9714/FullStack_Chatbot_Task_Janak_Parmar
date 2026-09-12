import { Request, Response } from "express";
import Enquiry from "../models/Enquiry";

export const createEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

if (!name || !email || !phone || !message) {
  return res.status(400).json({
    message: "All fields are required",
  });
}

const enquiry = await Enquiry.create({
  name,
  email,
  phone,
  message,
});

    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create enquiry",
    });
  }
};

export const getEnquiries = async (_req: Request, res: Response) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch enquiries",
    });
  }
};
export const updateEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update enquiry",
    });
  }
};

export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete enquiry",
    });
  }
};