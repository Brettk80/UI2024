import React, { useState, useRef } from 'react';
import { Bell, Package2, Video, FileText, Mail, BarChart3, HelpCircle, X, Send, Check } from 'lucide-react';
import Inbox from './Inbox';

interface DashboardProps {
  user: {
    name: string;
    email: string;
  };
}

interface Notification {
  id: string;
  fromNumber: string;
  toNumber: string;
  userInbox: string;
  pages: number;
  timestamp: string;
  read: boolean;
  previewUrl: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGettingStarted, setShowGettingStarted] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const isAccountOwner = true;

  const unreadCount = notifications.filter(n => !n.read).length;

  const sections = [
    { id: 'first-order', label: 'Your First Order', icon: Package2 },
    { id: 'fax-lists', label: 'Fax Lists', icon: FileText },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'mail-merge', label: 'Mail Merge', icon: Mail },
    { id: 'reporting', label: 'Reporting', icon: BarChart3 },
    { id: 'portal', label: 'Portal', icon: Package2 },
  ];

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        read: true
      }))
    );
  };

  const handleNotificationClick = (notification: Notification) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(n =>
        n.id === notification.id
          ? { ...n, read: true }
          : n
      )
    );
    setSelectedNotification(notification);
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <h1 className="flex flex-col sm:flex-row sm:items-center">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900">
                    OPENFAX
                  </span>
                  <span className="text-[0.65rem] sm:text-xs sm:ml-2 font-medium text-gray-400 tracking-widest uppercase">
                    Secure Fax Portal
                  </span>
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowGettingStarted(true)}
                className="text-gray-500 hover:text-gray-700"
              >
                <HelpCircle className="h-6 w-6" />
              </button>
              <div className="relative" ref={notificationRef}>
                <button
                  className="p-2 text-gray-400 hover:text-gray-500 relative"
                  onMouseEnter={() => setShowNotifications(true)}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllAsRead}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-gray-500 text-center py-4">No new notifications</p>
                        ) : (
                          notifications.map(notification => (
                            <div
                              key={notification.id}
                              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                notification.read ? 'bg-gray-50' : 'bg-blue-50'
                              }`}
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg overflow-hidden">
                                  <img
                                    src={notification.previewUrl}
                                    alt="Fax preview"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900">
                                    New fax from {notification.fromNumber}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    To: {notification.userInbox} ({notification.toNumber})
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {notification.pages} pages • {notification.timestamp}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-gray-900">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showGettingStarted && (
          <div className="mb-8 bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
                <button 
                  onClick={() => setShowGettingStarted(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Video className="w-full h-full text-gray-400" />
                </div>
                <div className="space-y-4">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        className="w-full flex items-center p-3 text-left rounded-lg hover:bg-gray-50"
                      >
                        <Icon className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-700">{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <Inbox 
            isAccountOwner={isAccountOwner}
            selectedFax={selectedNotification ? {
              id: selectedNotification.id,
              date: selectedNotification.timestamp,
              fromNumber: selectedNotification.fromNumber,
              ssid: `FAX${selectedNotification.id}`,
              toNumber: selectedNotification.toNumber,
              assignedUser: selectedNotification.userInbox,
              pageCount: selectedNotification.pages,
              previewUrl: selectedNotification.previewUrl,
              pdfUrl: 'https://example.com/fax.pdf'
            } : null}
            onFaxSelected={() => setSelectedNotification(null)}
            onNewFax={(count) => {
              const newNotification: Notification = {
                id: Date.now().toString(),
                fromNumber: '+1234567890',
                toNumber: '+0987654321',
                userInbox: 'John Doe',
                pages: Math.floor(Math.random() * 5) + 1,
                timestamp: new Date().toLocaleString(),
                read: false,
                previewUrl: 'https://example.com/fax-preview.jpg'
              };
              setNotifications(prev => [newNotification, ...prev]);
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;