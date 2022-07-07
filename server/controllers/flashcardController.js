import Flashcard from "../models/Flashcard.js";
import Deck from "../models/Deck.js";

/*
    QUERY FUNCTIONS
*/

export const queryFlashcard = (id) => {
	return Flashcard.findById(id);
};

export const queryAllFlashcards = () => {
	return Flashcard.find();
};

export const queryFlashcardsFromDeck = (deckID) => {
	return Flashcard.find({ deckID });
};

/*
    MUTATION FUNCTIONS
*/

export const createFlashcard = async (
	question,
	answer,
	imageURL,
	audioURL,
	deckID
) => {
	const flashcard = new Flashcard({
		question,
		answer,
		imageURL,
		audioURL,
		deckID,
	});
	await flashcard.save();
	return flashcard;
};

export const updateFlashcard = async (
	id,
	question,
	answer,
	imageURL,
	audioURL,
	deckID
) => {
	const flashcard = await Flashcard.findByIdAndUpdate(id, {
		question,
		answer,
		imageURL,
		audioURL,
		deckID,
	});
	return flashcard;
};

export const deleteFlashcard = async (id) => {
	const flashcard = await Flashcard.findByIdAndDelete(id);
	const deck = await Deck.findByIdAndUpdate(flashcard.deckID, {
		$set: { numberOfCards: deck.numberOfCards - 1 },
	});
	flashcard.remove();
	return flashcard;
};

/*
    FUNCTIONS USED IN OTHER CONTROLLERS (NOT RESOLVERS)
*/

export const deleteFlashcardsFromDeck = async (deckID) => {
	const flashcards = await Flashcard.find({ deckID });
	flashcards.forEach(async (flashcard) => {
		await deleteFlashcard(flashcard._id);
	});
	return flashcards;
};
