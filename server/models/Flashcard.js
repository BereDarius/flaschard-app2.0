import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	answer: {
		type: String,
		required: true,
	},
	imageURL: {
		type: String,
	},
	audioURL: {
		type: String,
	},
	deckID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Deck",
		required: true,
	},
});

export default mongoose.model("Flashcard", FlashcardSchema);
