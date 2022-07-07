import mongoose from "mongoose";

const DeckSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		numberOfCards: {
			type: Number,
			required: true,
		},
		reviewStars: {
			type: Number,
			required: true,
		},
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Deck", DeckSchema);
