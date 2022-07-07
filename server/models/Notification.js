import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		isRead: {
			type: Boolean,
			required: true,
		},
		userID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
