import { mongoose } from '../config/db';
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;


const User = new Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const usersModel = mongoose.model('user', User);
const UserTC = composeWithMongoose(mongoose.model("user", User))
export { usersModel,UserTC };

