import { gql } from "apollo-server-express";

export const userTypeDef = gql`
	type User {
		_id: ID
		name: String!
		email: String!
		password: String!
		profileImageURL: String!
		occupation: String!
		level: Int!
		bio: String!
		following: [User]
		followers: [User]
		startedDecks: [Deck]
		completedDecks: [Deck]
		createdAt: String
	}

	type Query {
		user(id: ID!): User
		users: [User]
		getFollowers(userID: ID!): [User]
		getFollowing(userID: ID!): [User]
	}

	type Mutation {
		register(
			name: String!
			email: String!
			password: String!
			profileImageURL: String!
			occupation: String!
			level: Int!
			bio: String!
		): User
		login(email: String!, password: String!): User
		updateUser(
			id: ID!
			name: String
			email: String
			password: String
			profileImageURL: String
			occupation: String
			level: Int
			bio: String
		): User
		followUser(currentUserID: ID!, followedUserID: ID!): User
		unfollowUser(currentUserID: ID!, unfollowedUserID: ID!): User
		deleteAccount(id: ID!): User
	}
`;
