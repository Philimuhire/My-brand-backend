import mongoose, { Document } from "mongoose";

interface ContactQueryModel extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const ContactQuerySchema = new mongoose.Schema<ContactQueryModel>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
});

const ContactQuery = mongoose.model<ContactQueryModel>("ContactQuery", ContactQuerySchema);

export default ContactQuery;
