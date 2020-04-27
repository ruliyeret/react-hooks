import React from "react"
import App from "../App";
import ApolloClient from "apollo-client"
import {createHttpLink}  from "apollo-link-http"
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloProvider} from "@apollo/react-hooks"
import AppStart from "../AppStart";

const httpLink = createHttpLink({
    uri:"http://localhost:3001/graphql"
});

const client   = new ApolloClient({
    link:httpLink,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client = {client}>
        <AppStart/>
    </ApolloProvider>)





