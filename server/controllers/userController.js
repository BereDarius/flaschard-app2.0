// Models imports
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// Helper functions imports
import { deleteDecksFromUser } from "./deckController.js";

/*
    QUERY FUNCTIONS
*/

/*
	Query user by id
*/
export const queryUser = (id) => {
	return User.findById(id);
};

/*
	Query all users
*/
export const queryAllUsers = () => {
	return User.find();
};

/*
	Function to get the followers of a user
*/
export const getFollowers = async (id) => {
	const user = await User.findById(id);

	// Get the followers of the user
	const followers = user.followers.map((followerUser) => {
		return User.findById(followerUser);
	});

	// Return the followers
	return followers;
};

/*
	Function to get the list of users that a user is following
*/
export const getFollowing = async (id) => {
	const user = await User.findById(id);

	// Get the users that the user is following
	const following = user.following.map((followingUser) => {
		return User.findById(followingUser);
	});

	// Return the users that the user is following
	return following;
};

/*
    MUTATION FUNCTIONS
*/

/*
	Function to register a new user
*/
export const register = async (
	name,
	email,
	password,
	profileImageURL,
	occupation,
	level,
	bio
) => {
	// check if user already exists
	const user = await User.findOne({ email });
	if (user) {
		throw new Error("User already exists");
	}
	// create new user
	const newUser = new User({
		name,
		email,
		password,
		profileImageURL,
		occupation,
		level,
		bio,
		following: [],
		followers: [],
		startedDecks: [],
		completedDecks: [],
	});
	await newUser.save();

	// create a new notification for the new user
	const notification = new Notification({
		userID: newUser._id,
		text: `Hello ${newUser.name}! Welcome to the Flashcard App!`,
		isRead: false,
	});
	await notification.save();

	// return new user
	return newUser;
};

/*
	Function to login a user
*/
export const login = async (email, password) => {
	const user = await User.findOne({ email });

	// check if user exists
	if (!user) {
		throw new Error("User not found");
	}

	// check if password is correct
	if (user.password !== password) {
		throw new Error("Password is incorrect");
	}

	// return user
	return user;
};

/*
	Function to update a user
*/
export const updateUser = async (
	id,
	name,
	email,
	password,
	profileImageURL,
	occupation,
	bio
) => {
	// update the user
	const user = await User.findByIdAndUpdate(id, {
		name,
		email,
		password,
		profileImageURL,
		occupation,
		bio,
	});

	// return user
	return user;
};

/*
	Function to follow a user
	- currentUserID: the user who is unfollowing
	- unfollowedUserID: the user who is being unfollowed
*/
export const followUser = async (currentUserID, followedUserID) => {
	const currentUser = await User.findById(currentUserID);

	// check if the current user is following the user
	if (currentUser.following.includes(followedUserID)) {
		throw new Error("Current user is already following this user");
	}

	// add the user to the current user's following array
	currentUser.following.push(followedUserID);
	await currentUser.save();

	// add the current user to the user's followers array
	const followedUser = await User.findById(followedUserID);
	followedUser.followers.push(currentUserID);
	await followedUser.save();

	// send a notification to the followed user
	await Notification.create({
		userID: followedUserID,
		text: `${currentUser.name} started following you!`,
		isRead: false,
	});

	// return the current user
	return currentUser;
};

/*
	Function to unfollow a user
	- currentUserID: the user who is unfollowing
	- unfollowedUserID: the user who is being unfollowed
*/
export const unfollowUser = async (currentUserID, unfollowedUserID) => {
	const currentUser = await User.findById(currentUserID);

	// check if the current user is following the user to be unfollowed
	if (!currentUser.following.includes(unfollowedUserID)) {
		throw new Error("Current user is not following this user");
	}

	// remove the user from the current user's following list
	currentUser.following = currentUser.following.filter(
		(user) => user.toString() !== unfollowedUserID.toString()
	);
	await currentUser.save();

	console.log(currentUser.following);

	// remove the current user from the user being unfollowed's followers list
	const unfollowedUser = await User.findById(unfollowedUserID);
	unfollowedUser.followers = unfollowedUser.followers.filter(
		(user) => user.toString() !== currentUserID.toString()
	);
	await unfollowedUser.save();

	// return the current user
	return currentUser;
};

/*
	Function to delete a user
	- deletes all decks created by the user
	- removes the user from all other users' followers and following lists
	- deletes all of the user's notifications
*/
export const deleteAccount = async (id) => {
	const deletedUser = await User.findById(id);

	// delete all decks created by the user
	await deleteDecksFromUser(deletedUser.id);

	// remove the user from the followers and following lists of all users
	await User.updateMany(
		{},
		{ $pull: { followers: id, following: id } },
		{ multi: true }
	);

	// delete all of the user's notifications
	await Notification.deleteMany({ userID: id });

	// delete the user
	await deletedUser.remove();
};
