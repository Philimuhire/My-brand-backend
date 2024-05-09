import { Request, Response } from "express";
import ContactQuery from "../models/ContactQueryModel";

export const saveContactQuery = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;
        const newQuery = await ContactQuery.create({ name, email, subject, message });
        res.status(201).json({ message: "Contact query saved successfully", query: newQuery });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getContactQueries = async (req: Request, res: Response) => {
    try {
        const queries = await ContactQuery.find();
        res.json(queries);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getContactQueryCount = async (req: Request, res: Response) => {
    try {
      const queryCount = await ContactQuery.countDocuments();
      res.json({ queryCount });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  export const deleteContactQueryById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedQuery = await ContactQuery.findByIdAndDelete(id);
      if (deletedQuery) {
        res.json({ message: "Contact query deleted successfully" });
      } else {
        res.status(404).json({ message: "Contact query not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
