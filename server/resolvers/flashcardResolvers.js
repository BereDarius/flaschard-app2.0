import {
	queryFlashcard,
	queryAllFlashcards,
	queryFlashcardsFromDeck,
	createFlashcard,
	updateFlashcard,
	deleteFlashcard,
} from "../controllers/flashcardController.js";

export const flashcardResolvers = {
	Query: {
		flashcard: async (_, { id }) => {
			return queryFlashcard(id);
		},
		flashcards: async () => {
			return queryAllFlashcards();
		},
		flashcardsFromDeck: async (_, { deckID }) => {
			return queryFlashcardsFromDeck(deckID);
		},
	},
	Mutation: {
		createFlashcard: async (
			_,
			{ question, answer, imageURL, audioURL, deckID }
		) => {
			return createFlashcard(
				question,
				answer,
				imageURL,
				audioURL,
				deckID
			);
		},
		updateFlashcard: async (
			_,
			{ id, question, answer, imageURL, audioURL, deckID }
		) => {
			return updateFlashcard(
				id,
				question,
				answer,
				imageURL,
				audioURL,
				deckID
			);
		},
		deleteFlashcard: async (_, { id }) => {
			return deleteFlashcard(id);
		},
	},
};
