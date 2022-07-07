import Comment from "../models/Comment.js";

/*
	QUERY FUNCTIONS
*/

/*
	Query comment by id
*/
export const queryComment = (id) => {
	return Comment.findById(id);
};

/*
	Query all comments
*/
export const queryAllComments = () => {
	return Comment.find();
};

/*
	Query all comments of a user
*/
export const queryCommentsFromDeck = (deckID) => {
	return Comment.find({ deckID });
};

/*
	MUTATION FUNCTIONS
*/

/*
	Function to create a comment
*/
export const createComment = async (
	text,
	numberOfLikes,
	replies,
	deckID,
	userID
) => {
	// create the comment
	const comment = new Comment({
		text,
		numberOfLikes,
		replies,
		deckID,
		userID,
	});
	await comment.save();

	// return the comment
	return comment;
};

/*
	Function to update a comment
*/
export const updateComment = async (id, text, numberOfLikes) => {
	// update the comment
	const comment = await Comment.findByIdAndUpdate(id, {
		text,
		numberOfLikes,
	});

	// return the comment
	return comment;
};

/*
	Function to delete a comment
*/
export const deleteComment = async (id) => {
	const comment = await Comment.findById(id);

	// delete the comment and its replies
	await deleteCommentAndReplies(comment);
};

/*
	FUNCTIONS USED IN OTHER CONTROLLERS (NOT RESOLVERS)
*/

/*
	Function to delete all comments from a deck
*/
export const deleteCommentsFromDeck = async (deckID) => {
	const comments = await Comment.find({ deckID });

	// delete all comments and their replies
	comments.forEach(async (comment) => {
		await deleteCommentAndReplies(comment);
	});
};

/*
	HELPER FUNCTIONS
*/

/*
	Function to delete a comment and its replies
*/
export const deleteCommentAndReplies = async (comment) => {
	// delete all replies of this comment
	comment.replies.forEach(async (reply) => {
		await deleteCommentAndReplies(reply);
	});

	// delete the comment
	await comment.remove();
};

/*
	Function to like a comment
*/
export const likeComment = async (id) => {
	// update the comment
	const comment = await Comment.findByIdAndUpdate(id, {
		numberOfLikes: 1,
	});

	// return the comment
	return comment;
};

/*
	Function to unlike a comment
*/
export const unlikeComment = async (id) => {
	// update the comment
	const comment = await Comment.findByIdAndUpdate(id, {
		numberOfLikes: -1,
	});

	// return the comment
	return comment;
};
