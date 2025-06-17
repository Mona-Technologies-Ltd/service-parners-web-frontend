import { MdOutlineNotificationsActive } from "react-icons/md"; 
import React, { useState } from 'react';
import './NotificationsPanel.css';

const allNotifications = [
  {
    id: 1,
    title: 'New Claim Submitted',
    message: 'Claim ID #12345 requires your review.',
    time: '2 mins ago',
    isNew: true
  },
  {
    id: 2,
    title: 'Reminder',
    message: 'Payment for Claim ID #67890 is due tomorrow.',
    time: '5 mins ago',
    isNew: true
  },
  {
    id: 3,
    title: 'Status Update',
    message: 'Claim ID #11223 has been approved.',
    time: '10 mins ago',
    isNew: false
  },
  {
    id: 4,
    title: 'Policy Update',
    message: 'Your insurance terms have changed.',
    time: '1 day ago',
    isNew: false
  }
];

export default function NotificationsPanel() {
  const [activeTab, setActiveTab] = useState('new');

  const displayedNotifications = activeTab === 'new'
    ? allNotifications.filter(n => n.isNew)
    : allNotifications;

  return (
    <div className="notifications-containers">
      <div className="notifications-header">
        <h6>Notifications</h6>
        <div className="tabs">
          <div
            className={`tab ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            New ({allNotifications.filter(n => n.isNew).length})
          </div>
          <div
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </div>
        </div>
      </div>

      <div className="notifications-body">
        {displayedNotifications.map((note) => (
          <div key={note.id} className="notification-item">
            <div className="icon-wrapper">
              <div className="icon-circle">
                <MdOutlineNotificationsActive size={20} />
              </div>
            </div>
            <div className="notification-content">
              <p className="title">{note.title}</p>
              <p className="message">{note.message}</p>
              <p className="time">{note.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
