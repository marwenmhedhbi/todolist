import express from 'express';
import * as dotenv from 'dotenv';
import bodyparser from 'body-parser';
import cors from 'cors';
import { requestLoggerMiddleware } from './request.logger.middleware';
dotenv.config();
const app = express();
import { Jwt } from './middlewares/authorize';
import { indexRouter } from './routes/index';
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
import graphqlSchema from "./schema/index";

const extensions = ({ context }) => {
    return {
      runTime: Date.now() - context.startTime,
    };
  };
 
var root = { hello: () => 'Hello world!' };
 
app.use(cors());
app.use(bodyparser.json());
app.use(requestLoggerMiddleware);

//unauthorised route
// app.use('/auth', authRouter);
app.use(
    "/graphql",
    graphqlHTTP((request) => {
      return {
        context: { startTime: Date.now() },
        graphiql: true,
        schema: graphqlSchema,
        extensions,
      };
    })
  );
//authorised route
//app.use(Jwt);
app.use('/', indexRouter);

export { app };
