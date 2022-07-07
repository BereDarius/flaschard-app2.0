import {
	queryComment,
	queryAllComments,
	queryCommentsFromDeck,
	createComment,
	updateComment,
	deleteComment,
	likeComment,
	unlikeComment,
} from "../controllers/commentController.js";

export const commentResolvers = {
	Query: {
		comment: async (_, { id }) => {
			return await queryComment(id);
		},
		comments: async () => {
			return await queryAllComments();
		},
		commentsFromDeck: async (_, { deckID }) => {
			return await queryCommentsFromDeck(deckID);
		},
	},
	Mutation: {
		createComment: async (
			_,
			{ text, numberOfLikes, replies, deckID, userID }
		) => {
			return await createComment(
				text,
				numberOfLikes,
				replies,
				deckID,
				userID
			);
		},
		updateComment: async (
			_,
			{ id, text, numberOfLikes, replies, deckID, userID }
		) => {
			return await updateComment(
				id,
				text,
				numberOfLikes,
				replies,
				deckID,
				userID
			);
		},
		deleteComment: async (_, { id }) => {
			await deleteComment(id);
			return {};
		},
		likeComment: async (_, { id }) => {
			return await likeComment(id);
		},
		unlikeComment: async (_, { id }) => {
			return await unlikeComment(id);
		},
	},
};
