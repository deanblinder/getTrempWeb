import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
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
    rides: {
        type: [Schema.Types.ObjectId],
        ref: 'Ride',
        default: [],
    },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
