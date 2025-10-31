import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";

interface About{
  _id?:mongoose.Types.ObjectId;
  heading:string;
  description:string;
  mission:string;
  vision:string;
  team:string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  thumbnail :string;
  about?:About[];
  isVerified: boolean;
  verifyToken: string;
  verifyTokenExpire: Date;

  getVerificationToken(): string;
}

// About Schema
const AboutSchema = new Schema<About>(
  {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true },
    team: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { _id: true }
);

const AdminSchema: Schema<IAdmin> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpire: {
    type: Date,
  },
  thumbnail :{
type:String ,
  },
  
   about: {
    type: [AboutSchema],
    default: [],
  },
  
});

AdminSchema.methods.getVerificationToken = function (): string {
  const verificationToken = crypto.randomBytes(20).toString("hex");
  this.verifyToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  return verificationToken;
};

export default mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
