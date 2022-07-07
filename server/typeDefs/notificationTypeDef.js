import { gql } from "apollo-server-express";

export const notificationTypeDef = gql`
	type Notification {
		_id: ID
		text: String!
		isRead: Boolean!
		user: User!
		createdAt: String
	}

	type Query {
		notification(id: ID!): Notification
		notifications: [Notification]
		notificationsFromUser(userID: ID!): [Notification]
	}

	type Mutation {
		createNotification(text: String!, user: ID!): Notification
		readNotification(id: ID!): Notification
		deleteNotification(id: ID!): Notification
	}
`;
