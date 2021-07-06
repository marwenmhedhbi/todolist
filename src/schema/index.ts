const { SchemaComposer } = require( 'graphql-compose');

const schemaComposer = new SchemaComposer();

import { UserQuery,UserMutation } from'./user';
import { TacheQuery,TacheMutation } from'./tache';
schemaComposer.Query.addFields({
    ...UserQuery,
    ...TacheQuery
});
schemaComposer.Mutation.addFields({
    ...UserMutation,
    ...TacheMutation
});
export = schemaComposer.buildSchema();