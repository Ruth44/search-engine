const mongoose = require("mongoose");

const KeywordSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true,
  },
  tokens: {
    type: Array,
    required: false,
  },
  stopwordRemoved: {
    type: String,
    required: false,
  },
  stemmed: {
    type: String,
    required: false,
  },
  weighted: {
    type: String,
    required: false,
  },
});

const KeywordModel = mongoose.model("keyword", KeywordSchema);

module.exports = KeywordModel;
