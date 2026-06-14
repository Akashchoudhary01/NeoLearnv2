import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      maxLength: [40, "Title Should be less then 40 character"],
      minLength: [8, "Title must be at least 8  character"],
      required: [true, "title is Required"],
      trim: true,
    },
    description: {
      type: String,
      minLength: [4, "Description Should be at least 4 character"],
      maxLength: [4000, "description Should be less then 400 character"],
      required: [true, "Description is Required"],
      trim: true,
    },
    category: {
      type: String,
      minLength: [4, "Category must be at least 4 character"],
      maxLength: [40, "Category Should be less then 400 character"],
      required: [true, "category is Required"],
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    lectures: [
      {
        title: String,
        description: String,
        video: {
          public_id: String,
          secure_url: String,
        },
      },
    ],

    noOfLecture: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

const COURSE = new model("course", courseSchema);

export default COURSE;
