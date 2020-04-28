import React from "react"
import App from "../App";
import { split } from 'apollo-link';
import ApolloClient from "apollo-client"
import {createHttpLink, HttpLink} from "apollo-link-http"
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloProvider} from "@apollo/react-hooks"
import { getMainDefinition } from 'apollo-utilities';

import AppStart from "../AppStart";
import {WebSocketLink} from "apollo-link-ws";

const wsLink = new WebSocketLink({
    uri: `ws://localhost:3001/graphql`,

});

const httpLink = new HttpLink({
    uri:"http://localhost:3001/graphql"
});

const link = split(
    ({ query }) => {
        // @ts-ignore
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);
const client   = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client = {client}>
        <AppStart/>
    </ApolloProvider>)





