import { mongoose } from '../config/db';
const { composeWithMongoose } = require("graphql-compose-mongoose");
const Schema = mongoose.Schema;


const Tache = new Schema(
  {
    name: String,
    completed: Boolean,
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    shared: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
    ],
    comment:[{
      content:String,
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    }]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const tachesModel = mongoose.model('tache', Tache);
const TacheTC = composeWithMongoose(mongoose.model("tache", Tache))
export { tachesModel,TacheTC };