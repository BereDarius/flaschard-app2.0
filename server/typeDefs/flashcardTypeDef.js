import { gql } from "apollo-server-express";

export const flashcardTypeDef = gql`
	type Flashcard {
		_id: ID
		question: String!
		answer: String!
		imageURL: String
		audioURL: String
		deck: Deck!
	}

	type Query {
		flashcard(id: ID!): Flashcard
		flashcards: [Flashcard]
		flashcardsFromDeck(deck: ID!): [Flashcard]
	}

	type Mutation {
		createFlashcard(
			question: String
			answer: String
			imageURL: String
			audioURL: String
			deck: ID
		): Flashcard
		updateFlashcard(
			id: ID
			question: String
			answer: String
			imageURL: String
			audioURL: String
			deck: ID
		): Flashcard
		deleteFlashcard(id: ID): Flashcard
	}
`;
