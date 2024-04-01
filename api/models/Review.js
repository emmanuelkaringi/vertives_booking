import mongoose from "mongoose";
const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        required: true,
     },
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);