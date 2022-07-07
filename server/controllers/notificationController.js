import Notification from "../models/Notification.js";

/*
    QUERY FUNCTIONS
*/

/*
	Query notification by id
*/
export const queryNotification = (id) => {
	return Notification.findById(id);
};

/*
	Query all notifications
*/
export const queryAllNotifications = () => {
	return Notification.find();
};

/*
	Query all notifications of a user
*/
export const queryNotificationsFromUser = async (userID) => {
	const notifications = await Notification.find({ userID });
	return notifications;
};

/*
    MUTATION FUNCTIONS
*/

/*
	Function to create a notification
*/
export const createNotification = async (text, userID) => {
	// create the notification
	const notification = new Notification({
		text,
		userID,
	});
	await notification.save();

	// return the notification
	return notification;
};

/*
	Function to delete a notification
*/
export const readNotification = async (id) => {
	const notification = await Notification.findById(id);

	// set the notification to read
	notification.read = true;
	await notification.save();

	// return the notification
	return notification;
};

/*
	Function to delete a notification
*/
export const deleteNotification = async (id) => {
	const notification = await Notification.findById(id);

	// delete the notification
	await notification.remove();

	// return the notification
	return notification;
};
