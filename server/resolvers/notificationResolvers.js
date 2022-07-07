import {
	queryNotification,
	queryAllNotifications,
	queryNotificationsFromUser,
	createNotification,
	readNotification,
	deleteNotification,
} from "../controllers/notificationController.js";

export const notificationResolvers = {
	Query: {
		notification: async (_, { id }) => {
			return await queryNotification(id);
		},
		notifications: async () => {
			return await queryAllNotifications();
		},
		notificationsFromUser: async (_, { userID }) => {
			return await queryNotificationsFromUser(userID);
		},
	},
	Mutation: {
		createNotification: async (_, { text, userID }) => {
			return await createNotification(text, userID);
		},
		readNotification: async (_, { id }) => {
			return await readNotification(id);
		},
		deleteNotification: async (_, { id }) => {
			await deleteNotification(id);
			return {};
		},
	},
};
