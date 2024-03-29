const mongoose = require("../../database");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  picture: {
    type: String,
  },
  cep: {
    type: Number,
  },
  street: {
    type: String,
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  uf: {
    type: String,
  },
  complement: {
    type: String,
  },
  cart: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = Users;
