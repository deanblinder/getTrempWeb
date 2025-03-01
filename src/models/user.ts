import mongoose from "mongoose";
const { Schema } = mongoose;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  facebookUrl?: string;
  instagramUrl?: string;
  phoneNumber?: string;
  profilePicture?: string;
}

const userSchema = new Schema<User>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  facebookUrl: {
    type: String,
  },
  instagramUrl: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
