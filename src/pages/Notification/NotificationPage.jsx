import { useState } from "react";
import { FaBell } from "react-icons/fa";

const notificationsData = [
    // {
    //   id: 1,
    //   title: "New Message Received",
    //   description: "You have a new message from John Doe.",
    //   timestamp: "2 hours ago",
    //   read: false,
    // },
    // {
    //   id: 2,
    //   title: "Order Shipped",
    //   description: "Your recent order has been shipped.",
    //   timestamp: "1 day ago",
    //   read: true,
    // },
    // {
    //   id: 3,
    //   title: "Payment Successful",
    //   description: "Your payment for the subscription was successful.",
    //   timestamp: "2 days ago",
    //   read: true,
    // },
    // {
    //   id: 4,
    //   title: "System Update",
    //   description: "A new system update is available.",
    //   timestamp: "3 days ago",
    //   read: false,
    // },
  ];
  
  const NotificationPage = () => {
    const [notifications, setNotifications] = useState(notificationsData);
  
    const markAllAsRead = () => {
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      setNotifications(updatedNotifications);
    };
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 -mt-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            Notifications
          </h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>
        </div>
  
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          {notifications.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">
              You have no new notifications.
            </p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 rounded-lg flex items-start space-x-4 ${
                    notification.read
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-gray-50 dark:bg-gray-600 border border-blue-200"
                  }`}
                >
                  <div className="flex-shrink-0">
                    <FaBell
                      className={`text-2xl ${
                        notification.read ? "text-gray-400" : "text-blue-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {notification.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {notification.description}
                    </p>
                    <p className="text-sm text-gray-400">{notification.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
  
  export default NotificationPage;
  