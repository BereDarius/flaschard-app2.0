import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		profileImageURL: {
			type: String,
			required: true,
		},
		occupation: {
			type: String,
			required: true,
		},
		level: {
			type: Number,
			required: true,
		},
		bio: {
			type: String,
			required: true,
		},
		following: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		followers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		startedDecks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Deck",
			},
		],
		completedDecks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Deck",
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model("User", UserSchema);
