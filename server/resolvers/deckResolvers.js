import {
	queryDeck,
	queryAllDecks,
	queryDecksFromUser,
	createDeck,
	updateDeck,
	deleteDeck,
} from "../controllers/deckController.js";

export const deckResolvers = {
	Query: {
		deck: async (_, { id }) => {
			return await queryDeck(id);
		},
		decks: async () => {
			return await queryAllDecks();
		},
		decksFromUser: async (_, { userID }) => {
			return await queryDecksFromUser(userID);
		},
	},
	Mutation: {
		createDeck: async (
			_,
			{ name, category, description, numberOfCards, reviewStars, userID }
		) => {
			return await createDeck(
				name,
				category,
				description,
				numberOfCards,
				reviewStars,
				userID
			);
		},
		updateDeck: async (
			_,
			{ id, name, category, description, numberOfCards, reviewStars }
		) => {
			return await updateDeck(
				id,
				name,
				category,
				description,
				numberOfCards,
				reviewStars
			);
		},
		deleteDeck: async (_, { id }) => {
			await deleteDeck(id);
			return {};
		},
	},
};
