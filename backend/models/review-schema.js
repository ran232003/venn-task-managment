const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String, // Assuming you're using a movie API ID (like TMDb)
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String, // URL to movie poster
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds `createdAt` and `updatedAt` automatically
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
