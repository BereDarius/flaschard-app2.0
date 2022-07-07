import Deck from "../models/Deck.js";

import { deleteFlashcardsFromDeck } from "./flashcardController.js";
import { deleteCommentsFromDeck } from "./commentController.js";

/*
	QUERY FUNCTIONS
*/

export const queryDeck = (id) => {
	return Deck.findById(id);
};

export const queryAllDecks = () => {
	return Deck.find();
};

export const queryDecksFromUser = async (userID) => {
	const decks = await Deck.find({ userID });
	return decks;
};

/*
	MUTATION FUNCTIONS
*/

export const createDeck = async (
	name,
	category,
	description,
	numberOfCards,
	reviewStars,
	userID
) => {
	const deck = new Deck({
		name,
		category,
		description,
		numberOfCards,
		reviewStars,
		userID,
	});
	await deck.save();
	return deck;
};

export const updateDeck = async (
	id,
	name,
	category,
	description,
	numberOfCards,
	reviewStars
) => {
	const deck = await Deck.findByIdAndUpdate(id, {
		name,
		category,
		description,
		numberOfCards,
		reviewStars,
	});
	return deck;
};

export const deleteDeck = async (id) => {
	const deck = await Deck.findById(id);
	await deleteFlashcardsFromDeck(deck);
	await deleteCommentsFromDeck(deck);
	await deck.remove();
	return deck;
};

/*
	FUNCTIONS USED IN OTHER CONTROLLERS (NOT RESOLVERS)
*/

export const deleteDecksFromUser = async (userID) => {
	const decks = await Deck.find({ userID });
	decks.forEach(async (deck) => {
		await deleteFlashcardsFromDeck(deck);
		await deleteCommentsFromDeck(deck);
		await deck.remove();
	});
};
