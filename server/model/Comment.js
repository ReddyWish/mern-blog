const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
  },
  {
    timestamps: true
  })


module.exports = mongoose.model("Comment", commentSchema)
