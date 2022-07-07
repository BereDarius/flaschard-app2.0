import { ApolloServer } from "apollo-server-express";

import express from "express";

import connectDB from "./config/db.js";

import {} from "dotenv/config";
const port = process.env.PORT || 5000;

import { flashcardTypeDef } from "./typeDefs/flashcardTypeDef.js";
import { deckTypeDef } from "./typeDefs/deckTypeDef.js";
import { commentTypeDef } from "./typeDefs/commentTypeDef.js";
import { notificationTypeDef } from "./typeDefs/notificationTypeDef.js";
import { userTypeDef } from "./typeDefs/userTypeDef.js";

import { flashcardResolvers } from "./resolvers/flashcardResolvers.js";
import { deckResolvers } from "./resolvers/deckResolvers.js";
import { commentResolvers } from "./resolvers/commentResolvers.js";
import { notificationResolvers } from "./resolvers/notificationResolvers.js";
import { userResolvers } from "./resolvers/userResolvers.js";

const app = express();

// Connect to MongoDB
connectDB();

const server = new ApolloServer({
	typeDefs: [
		flashcardTypeDef,
		deckTypeDef,
		commentTypeDef,
		notificationTypeDef,
		userTypeDef,
	],
	resolvers: [
		flashcardResolvers,
		deckResolvers,
		commentResolvers,
		notificationResolvers,
		userResolvers,
	],
	// context: ({ req }) => ({ req }),
});

await server.start();

server.applyMiddleware({ app });

app.listen({ port }, () => {
	console.log(
		`Server is running on http://localhost:${port}${server.graphqlPath}`
	);
});
