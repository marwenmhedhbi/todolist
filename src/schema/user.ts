import  { usersModel, UserTC} from "../models/Users";
import * as graphql from "graphql"
import * as jwt from 'jsonwebtoken';
const secret = process.env.SECRET_KEY;

const userAuth = new graphql.GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: graphql.GraphQLInt },
    email: { type: graphql.GraphQLString },
    password: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
    token: { type: graphql.GraphQLString },
    msg: { type: graphql.GraphQLString },
  }),
});
const auth  = UserTC.addResolver({
  name: 'authentification',
  args: { email: 'String',password:"String" },
  type: userAuth,
  resolve: async ({ source, args }) => {
    const user:any = await usersModel.findOne({email:args.email})
    if(user){
      if(user.password == args.password ){
        const token = jwt.sign(
          {
              id: user._id,
          },
          secret,
          {
              expiresIn: 86400,
          },
      );
        return {
          email:user.email,
          password:user.password,
          token:token,
          msg:"connected"
        }
      }else{
        return {
          msg:"wrong password"
        }
      }
    }else{
      return  {
        msg:"wrong email"
      };
    }
  },
});

const UserQuery = {
  userById: UserTC.getResolver("findById"),
  userByIds: UserTC.getResolver("findByIds"),
  userOne: UserTC.getResolver("findOne"),
  userMany: UserTC.getResolver("findMany"),
  userCount: UserTC.getResolver("count"),
  userConnection: UserTC.getResolver("connection"),
  userPagination: UserTC.getResolver("pagination"),
  auth: UserTC.getResolver("authentification")
};

const UserMutation = {
  userCreateOne: UserTC.getResolver("createOne"),
  userCreateMany: UserTC.getResolver("createMany"),
  userUpdateById: UserTC.getResolver("updateById"),
  userUpdateOne: UserTC.getResolver("updateOne"),
  userUpdateMany: UserTC.getResolver("updateMany"),
  userRemoveById: UserTC.getResolver("removeById"),
  userRemoveOne: UserTC.getResolver("removeOne"),
  userRemoveMany: UserTC.getResolver("removeMany"),
};

export { UserQuery, UserMutation,auth };
