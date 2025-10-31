import mongoose, { Schema, model, models } from "mongoose";
import crypto from "crypto";
import { text } from "stream/consumers";

// Contact interface with all required fields
interface Contact {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  address: string;
  phoneNo: string;
  message?: string; // Patient's original message
  status: 'pending' | 'accepted' | 'rejected';
  doctorMessage?: string; // Doctor's response message
  date?: string; // Scheduled date (YYYY-MM-DD format)
  time?: string; // Scheduled time (HH:MM format)
  createdAt: Date;
  updatedAt?: Date;
}


interface Blog {
  _id?: mongoose.Types.ObjectId;
  heading:string;

  like: number;       // ✅ changed from string to number
  dislike: number;    // ✅ changed from string to number
  text: string;
  images?: string[];
  createdAt: Date;
  updatedAt?: Date;
}




interface Degree {
  name: string;
  college: string;
  year: string;
}

interface Education {
  year: string;
  examName: string;
  institute: string;
}

interface Work {
  role: string;
  college: string;
  day: string;
  time: string;
  collegePhoneNumber: string;
}

interface Experience {
  role: string;
  college: string;
  startingYear: string;
  endingYear: string;
}

interface Chamber {
  place: string;
  day: string;
  time: string;
  bookContact: string;
}

// Main User interface
export interface IUser extends Document {
  // Authentication
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  isVerified: boolean;
  verifyToken: string;
  verifyTokenExpire: Date;
  getVerificationToken(): string;
  otp: string;
  otpExpire:Date;


  // Profile
  optionalEmail?: string;
  registerId?: string;
  specialization?: string;
  profilePhoto?: string;
  contactNo?: string;
  bio?: string;
  aboutPicture?: string;
  blocked?:boolean;
  blockedUntil?:Date;
  adminVerified?:boolean;
  // Social
  fbLink?: string;
  instagram?: string;
  linkedin?: string;
  youTubeLink?: string;
  gallery?: string[];

  // Professional
  degrees?: Degree[];
  education?: Education[];
  mbbsCollege?: string;
  work?: Work[];
  experience?: Experience[];
  chamber?: Chamber[];

  // Appointments
  contacts?: Contact[];
   blogs?: Blog[];
}

// Contact Schema
const ContactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  address: { type: String, trim: true, default: "" },
  phoneNo: { type: String, required: true, trim: true },
  message: { type: String, trim: true }, // Made optional to match frontend
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  doctorMessage: { type: String, trim: true }, // Added for doctor's response
  date: { type: String, trim: true }, // Added for scheduled date
  time: { type: String, trim: true }, // Added for scheduled time
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date }
}, {
  _id: true,
  versionKey: false
});

// Blog Schema
const BlogSchema = new Schema<Blog>(
  {
    like: { type: Number, default: 0 },

    dislike: { type: Number, default: 0 },
    text: { type: String, required: true },
    heading: { type: String, required: true },
    images:{ type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { _id: true }
);

const UserSchema: Schema<IUser> = new Schema(
  {
    // Authentication
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phoneNo: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    isVerified: { type: Boolean, default: false },
    verifyToken: { type: String, select: false },
    verifyTokenExpire: { type: Date, select: false }, // ✅ this name matters!
    
    otp: { type: String, select: false  },         // if hidden by default
    otpExpire: { type: Date, select: false },

    // Profile
    optionalEmail: { type: String, unique: true, sparse: true, trim: true, lowercase: true },
    registerId: { type: String, unique: true, sparse: true, trim: true },
    bio: { type: String, trim: true },
    aboutPicture: { type: String },
    contactNo: { type: String, sparse: true, trim: true },
    specialization: { type: String, trim: true },
  profilePhoto: { type: String, default: "/Drprofile.png" },
    blocked: {
      type: Boolean,
      default: false,
    },
    blockedUntil: {
      type: Date,
      default: null,
    },
    adminVerified:{
      type: Boolean,
      default: false,
    },
    // Social
    linkedin: { type: String, trim: true },
    fbLink: { type: String, trim: true },
    instagram: { type: String, trim: true },
    youTubeLink: { type: String, trim: true },
    gallery: { type: [String], default: [] },

    // Professional
    degrees: { type: [ { name: String, college: String, year: String } ], default: [] },
    education: { type: [ { year: String, examName: String, institute: String } ], default: [] },
    mbbsCollege: { type: String, trim: true },
    work: { type: [ { role: String, college: String, day: String, time: String, collegePhoneNumber: String } ], default: [] },
    experience: { type: [ { role: String, college: String, startingYear: String, endingYear: String } ], default: [] },
    chamber: { type: [ { place: String, day: String, time: String, bookContact: String } ], default: [] },
  blogs: {
    type: [BlogSchema],
    default: [],
  },
    // Appointments
    contacts: { type: [ContactSchema], default: [] }
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.verifyToken;
        delete ret.verifyTokenExpire;
        return ret;
      }
    },
    versionKey: false
  }
);

// Method to generate token
UserSchema.methods.getVerificationToken = function () {
  const rawToken = crypto.randomBytes(32).toString("hex");

  this.verifyToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  this.verifyTokenExpire = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  return rawToken;
};
// Indexes
UserSchema.index({ 'contacts.status': 1 });
UserSchema.index({
  name: 'text',
  specialization: 'text',
  'degrees.name': 'text',
  'education.examName': 'text'
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);