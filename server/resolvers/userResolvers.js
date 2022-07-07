import {
	queryUser,
	queryAllUsers,
	register,
	login,
	updateUser,
	followUser,
	unfollowUser,
	getFollowers,
	getFollowing,
	deleteAccount,
} from "../controllers/userController.js";

export const userResolvers = {
	Query: {
		user: async (_, { id }) => {
			return await queryUser(id);
		},
		users: async () => {
			return await queryAllUsers();
		},
		getFollowers: async (_, { userID }) => {
			return await getFollowers(userID);
		},
		getFollowing: async (_, { userID }) => {
			return await getFollowing(userID);
		},
	},
	Mutation: {
		register: async (
			_,
			{ name, email, password, profileImageURL, occupation, level, bio }
		) => {
			return await register(
				name,
				email,
				password,
				profileImageURL,
				occupation,
				level,
				bio
			);
		},
		login: async (_, { email, password }) => {
			return await login(email, password);
		},
		updateUser: async (
			_,
			{ id, name, email, password, profileImageURL, occupation, bio }
		) => {
			return await updateUser(
				id,
				name,
				email,
				password,
				profileImageURL,
				occupation,
				bio
			);
		},
		followUser: async (_, { currentUserID, followedUserID }) => {
			return await followUser(currentUserID, followedUserID);
		},
		unfollowUser: async (_, { currentUserID, unfollowedUserID }) => {
			return await unfollowUser(currentUserID, unfollowedUserID);
		},
		deleteAccount: async (_, { id }) => {
			return await deleteAccount(id);
		},
	},
};
