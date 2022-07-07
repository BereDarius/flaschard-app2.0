import Comment from "../models/Comment.js";

/*
	QUERY FUNCTIONS
*/

export const queryComment = (id) => {
	return Comment.findById(id);
};

export const queryAllComments = () => {
	return Comment.find();
};

export const queryCommentsFromDeck = (deckID) => {
	return Comment.find({ deckID });
};

/*
	MUTATION FUNCTIONS
*/

export const createComment = async (
	text,
	numberOfLikes,
	replies,
	deckID,
	userID
) => {
	const comment = new Comment({
		text,
		numberOfLikes,
		replies,
		deckID,
		userID,
	});
	await comment.save();
	return comment;
};

export const updateComment = async (
	id,
	text,
	numberOfLikes,
	replies,
	deckID,
	userID
) => {
	const comment = await Comment.findByIdAndUpdate(id, {
		text,
		numberOfLikes,
		replies,
		deckID,
		userID,
	});
	return comment;
};

export const deleteComment = async (id) => {
	const comment = await Comment.findById(id);
	await removeCommentAndReplies(comment);
	return comment;
};

/*
	FUNCTIONS USED IN OTHER CONTROLLERS (NOT RESOLVERS)
*/

export const deleteCommentsFromDeck = async (deckID) => {
	const comments = await Comment.find({ deckID });
	comments.forEach(async (comment) => {
		await removeCommentAndReplies(comment);
	});
	return comments;
};

/*
	HELPER FUNCTIONS
*/

export const removeCommentAndReplies = async (comment) => {
	comment.replies.forEach(async (reply) => {
		await removeCommentAndReplies(reply);
	});
	await comment.remove();
};
