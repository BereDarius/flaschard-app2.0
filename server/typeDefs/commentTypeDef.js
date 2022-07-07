import { gql } from "apollo-server-express";

export const commentTypeDef = gql`
	type Comment {
		_id: ID!
		text: String!
		user: User!
		deck: Deck!
		replies: [Comment]
		numberOfLikes: Int!
		createdAt: String
	}

	type Query {
		comment(id: ID!): Comment
		comments: [Comment]
		commentsFromDeck(deckID: ID!): [Comment]
	}

	type Mutation {
		createComment(text: String, user: ID, deck: ID): Comment
		updateComment(id: ID, text: String): Comment
		deleteComment(id: ID): Comment
		likeComment(id: ID): Comment
		unlikeComment(id: ID): Comment
		addReply(id: ID, text: String): Comment
	}
`;
