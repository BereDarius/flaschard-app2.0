import Deck from "../models/Deck.js";

import { deleteFlashcardsFromDeck } from "./flashcardController.js";
import { deleteCommentsFromDeck } from "./commentController.js";

/*
	QUERY FUNCTIONS
*/

/*
	Query deck by id
*/
export const queryDeck = (id) => {
	return Deck.findById(id);
};

/*
	Query all decks
*/
export const queryAllDecks = () => {
	return Deck.find();
};

/*
	Query all decks of a user
*/
export const queryDecksFromUser = async (userID) => {
	const decks = await Deck.find({ userID });
	return decks;
};

/*
	MUTATION FUNCTIONS
*/

/*
	Function to create a deck
*/
export const createDeck = async (
	name,
	category,
	description,
	numberOfCards,
	reviewStars,
	userID
) => {
	// create the deck
	const deck = new Deck({
		name,
		category,
		description,
		numberOfCards,
		reviewStars,
		userID,
	});
	await deck.save();

	// return the deck
	return deck;
};

/*
	Function to update a deck
*/
export const updateDeck = async (
	id,
	name,
	category,
	description,
	numberOfCards,
	reviewStars
) => {
	// update the deck
	const deck = await Deck.findByIdAndUpdate(id, {
		name,
		category,
		description,
		numberOfCards,
		reviewStars,
	});

	// return the deck
	return deck;
};

/*
	Function to delete a deck
	- deletes all flashcards and comments associated with the deck
*/
export const deleteDeck = async (id) => {
	const deck = await Deck.findById(id);

	// delete all flashcards from this deck
	await deleteFlashcardsFromDeck(deck);

	// delete all comments from this deck
	await deleteCommentsFromDeck(deck);

	// delete the deck
	await deck.remove();
};

/*
	FUNCTIONS USED IN OTHER CONTROLLERS (NOT RESOLVERS)
*/

/*
	Function to delete all decks of a user
*/
export const deleteDecksFromUser = async (userID) => {
	// get all decks of this user
	const decks = await Deck.find({ userID });

	// delete all flashcards from all decks of this user
	decks.forEach(async (deck) => {
		// delete all flashcards from this deck
		await deleteFlashcardsFromDeck(deck);

		// delete all comments from this deck
		await deleteCommentsFromDeck(deck);

		// delete the deck
		await deck.remove();
	});
};
