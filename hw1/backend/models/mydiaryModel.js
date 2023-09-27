import mongoose from "mongoose";

// Create a schema
const myDiarySchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    moodtag: {
      type: String,
      required: true,
      enum: ["Happy", "Sad", "Angry"],
    },
    personaltag: {
      type: String,
      required: true,
      enum: ["Schoolwork", "Social", "Clubactivity"],
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    // This option is to make sure that when a new document is created,
    // the timestamps will be added automatically.

    timestamps: true,
  },
);

// Create a model
const MyDiaryModel = mongoose.model("MyDiary", myDiarySchema);

export default MyDiaryModel;
