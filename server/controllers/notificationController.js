import Notification from "../models/Notification.js";

/*
    QUERY FUNCTIONS
*/

export const queryNotification = (id) => {
	return Notification.findById(id);
};

export const queryAllNotifications = () => {
	return Notification.find();
};

export const queryNotificationsFromUser = async (userID) => {
	const notifications = await Notification.find({ userID });
	return notifications;
};

/*
    MUTATION FUNCTIONS
*/

export const createNotification = async (text, userID) => {
	const notification = new Notification({
		text,
		userID,
	});
	await notification.save();
	return notification;
};

export const readNotification = async (id) => {
	const notification = await Notification.findByIdAndUpdate(id, {
		isRead: true,
	});
	return notification;
};

export const deleteNotification = async (id) => {
	const notification = await Notification.findById(id);
	await notification.remove();
	return notification;
};
