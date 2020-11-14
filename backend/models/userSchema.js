const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String, //gets URL not a actual file
    required: true,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId, //helps mongo determine the id
      required: true,
      ref: "Post", //connects current scheme with another Schema
    },
  ],
});
// exports with the correct collection and schema using mongoose
module.exports = mongoose.model("User", userSchema);
