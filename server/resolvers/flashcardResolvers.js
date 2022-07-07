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
			return await queryFlashcard(id);
		},
		flashcards: async () => {
			return await queryAllFlashcards();
		},
		flashcardsFromDeck: async (_, { deckID }) => {
			return await queryFlashcardsFromDeck(deckID);
		},
	},
	Mutation: {
		createFlashcard: async (
			_,
			{ question, answer, imageURL, audioURL, deckID }
		) => {
			return await createFlashcard(
				question,
				answer,
				imageURL,
				audioURL,
				deckID
			);
		},
		updateFlashcard: async (
			_,
			{ id, question, answer, imageURL, audioURL }
		) => {
			return await updateFlashcard(
				id,
				question,
				answer,
				imageURL,
				audioURL
			);
		},
		deleteFlashcard: async (_, { id }) => {
			await deleteFlashcard(id);
			return {};
		},
	},
};
