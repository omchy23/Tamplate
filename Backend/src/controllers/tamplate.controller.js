import { Template } from "../models/tamplate.model.js";

// Upload a new template
export const createTemplate = async (req, res) => {
  try {
    const { link, category } = req.body;

    if (!link || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const template = await Template.create({ link, category });

    res.status(201).json({
      success: true,
      template,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all templates
export const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({
      success: true,
      templates,
    });
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).json({ message: "Server error" });
  }
};
