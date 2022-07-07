import Flashcard from "../models/Flashcard.js";
import Deck from "../models/Deck.js";

/*
    QUERY FUNCTIONS
*/

/*
	Query flashcard by id
*/
export const queryFlashcard = (id) => {
	return Flashcard.findById(id);
};

/*
	Query all flashcards
*/
export const queryAllFlashcards = () => {
	return Flashcard.find();
};

/*
	Query all flashcards of a deck
*/
export const queryFlashcardsFromDeck = (deckID) => {
	return Flashcard.find({ deckID });
};

/*
    MUTATION FUNCTIONS
*/

/*
	Function to create a flashcard
*/
export const createFlashcard = async (
	question,
	answer,
	imageURL,
	audioURL,
	deckID
) => {
	// check if the deck exists
	const deck = await Deck.findById(deckID);
	if (!deck) {
		throw new Error("Deck not found");
	}

	// create the flashcard
	const flashcard = new Flashcard({
		question,
		answer,
		imageURL,
		audioURL,
		deckID,
	});
	await flashcard.save();

	// return the flashcard
	return flashcard;
};

/*
	Function to update a flashcard
*/
export const updateFlashcard = async (
	id,
	question,
	answer,
	imageURL,
	audioURL
) => {
	// update the flashcard
	const flashcard = await Flashcard.findByIdAndUpdate(id, {
		question,
		answer,
		imageURL,
		audioURL,
	});

	// return the flashcard
	return flashcard;
};

/*
	Function to delete a flashcard
*/
export const deleteFlashcard = async (id) => {
	const flashcard = await Flashcard.findById(id);

	// decrement the deck's flashcard count
	const deck = await Deck.findById(flashcard.deckID);
	deck.flashcardCount--;
	await deck.save();

	// delete the flashcard
	await flashcard.remove();
};

/*
    FUNCTIONS USED IN OTHER CONTROLLERS (NOT RESOLVERS)
*/

/*
	Function to delete all flashcards of a deck
*/
export const deleteFlashcardsFromDeck = async (deckID) => {
	// get all flashcards of the deck
	const flashcards = await Flashcard.find({ deckID });

	// delete all flashcards
	flashcards.forEach(async (flashcard) => {
		await flashcard.remove();
	});

	// set the deck's flashcard count to 0
	const deck = await Deck.findById(deckID);
	deck.flashcardCount = 0;
	await deck.save();
};
