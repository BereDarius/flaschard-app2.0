import { gql } from "apollo-server-express";

export const deckTypeDef = gql`
	type Deck {
		_id: ID
		name: String!
		category: String!
		description: String!
		flashcards: [Flashcard]
		numberOfCards: Int!
		reviewStars: Float!
		userID: User!
		createdAt: String
	}

	type Query {
		deck(id: ID!): Deck
		decks: [Deck]
		decksFromUser(userID: ID!): [Deck]
	}

	type Mutation {
		createDeck(
			name: String!
			category: String!
			description: String!
			numberOfCards: Int!
			reviewStars: Float!
			userID: ID!
		): Deck
		updateDeck(
			id: ID
			name: String!
			category: String!
			description: String!
			numberOfCards: Int!
			reviewStars: Float!
		): Deck
		deleteDeck(id: ID!): Deck
	}
`;
