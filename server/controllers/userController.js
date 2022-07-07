import User from "../models/User.js";

import { deleteDecksFromUser } from "./deckController.js";

/*
    QUERY FUNCTIONS
*/

export const queryUser = (id) => {
	return User.findById(id);
};

export const queryAllUsers = () => {
	return User.find();
};

export const getFollowers = async (id) => {
	const user = await User.findById(id);
	const followers = user.followers.map((followerUser) => {
		return User.findById(followerUser);
	});
	return followers;
};

export const getFollowing = async (id) => {
	const user = await User.findById(id);
	const following = user.following.map((followingUser) => {
		return User.findById(followingUser);
	});
	return following;
};

/*
    MUTATION FUNCTIONS
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
	const newUser = await User.create({
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
	return newUser;
};

export const login = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("User not found");
	}
	if (user.password !== password) {
		throw new Error("Password is incorrect");
	}
	return user;
};

export const updateUser = async (
	id,
	name,
	email,
	password,
	profileImageURL,
	occupation,
	bio
) => {
	const user = await User.findByIdAndUpdate(id, {
		name,
		email,
		password,
		profileImageURL,
		occupation,
		bio,
	});
	return user;
};

export const followUser = async (currentUserID, followedUserID) => {
	// check if the current user is following the user
	const user = await User.findById(currentUserID);
	if (currentUser.following.includes(followedUserID)) {
		throw new Error("Current user is already following this user");
	}
	const currentUser = await User.findByIdAndUpdate(currentUserID, {
		$push: { following: followedUserID },
	});
	await User.findByIdAndUpdate(followedUserID, {
		$push: { followers: currentUserID },
	});
	return currentUser;
};

export const unfollowUser = async (currentUserID, unfollowedUserID) => {
	// check if the current user is following the user
	const user = await User.findById(currentUserID);
	if (!currentUser.following.includes(unfollowedUserID)) {
		throw new Error("Current user is not following this user");
	}
	const currentUser = await User.findByIdAndUpdate(currentUserID, {
		$pull: { following: unfollowedUserID },
	});
	await User.findByIdAndUpdate(unfollowedUserID, {
		$pull: { followers: currentUserID },
	});
	return currentUser;
};

export const deleteAccount = async (id) => {
	const user = await User.findById(id);
	await deleteDecksFromUser(user._id);
	user.remove();
	return user;
};
