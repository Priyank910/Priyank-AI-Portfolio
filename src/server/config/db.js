import mongoose from "mongoose";
import fs from "fs";
import path from "path";

let isConnected = false;

export async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.warn("MongoDB setup: MONGO_URI is not defined. Falling back to local JSON database storage.");
    return false;
  }

  try {
    // Attempt connecting to database with short timeout so it doesn't hang startup
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log("MongoDB is successfully connected!");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed, falling back to local JSON database store. Error:", error);
    isConnected = false;
    return false;
  }
}

export function isMongoDBConnected() {
  return isConnected;
}

// Local JSON Storage fallback helper
const fallbackDir = path.join(process.cwd(), "src", "server", "data");
const submissionsFile = path.join(fallbackDir, "submissions.json");

if (!fs.existsSync(fallbackDir)) {
  fs.mkdirSync(fallbackDir, { recursive: true });
}

export async function saveContactSubmission(data) {
  const newSubmission = {
    ...data,
    createdAt: new Date().toISOString(),
  };

  if (isConnected) {
    try {
      const ContactSchema = new mongoose.Schema({
        name: String,
        email: String,
        subject: String,
        message: String,
        createdAt: { type: Date, default: Date.now }
      });
      
      const ContactModel = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
      const doc = new ContactModel(newSubmission);
      const savedDoc = await doc.save();
      newSubmission._id = savedDoc._id.toString();
      return newSubmission;
    } catch (err) {
      console.error("Failed to write submission to MongoDB collection, backing up locally.", err);
    }
  }

  // Backup or primary local file write
  let submissions = [];
  if (fs.existsSync(submissionsFile)) {
    try {
      submissions = JSON.parse(fs.readFileSync(submissionsFile, "utf-8"));
    } catch {
      submissions = [];
    }
  }

  newSubmission._id = "local_" + Math.random().toString(36).substring(2, 11);
  submissions.push(newSubmission);
  fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2), "utf-8");
  return newSubmission;
}

export async function getContactSubmissions() {
  if (isConnected) {
    try {
      const ContactModel = mongoose.models.Contact || mongoose.model("Contact", new mongoose.Schema({
        name: String,
        email: String,
        subject: String,
        message: String,
        createdAt: { type: Date, default: Date.now }
      }));
      const docs = await ContactModel.find().sort({ createdAt: -1 });
      return docs.map(doc => ({
        _id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        subject: doc.subject,
        message: doc.message,
        createdAt: doc.createdAt.toISOString()
      }));
    } catch (err) {
      console.error("Failed to read from MongoDB contacts direct model. Reading from backup.", err);
    }
  }

  if (fs.existsSync(submissionsFile)) {
    try {
      return JSON.parse(fs.readFileSync(submissionsFile, "utf-8"));
    } catch {
      return [];
    }
  }
  return [];
}
