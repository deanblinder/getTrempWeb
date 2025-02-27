import mongoose from "mongoose";
const { Schema } = mongoose;

const useSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  facebookLink: {
    type: String,
  },
  instegramLink: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  profileImage: {
    type: String,
  },
});

export default mongoose.model("User", useSchema);
