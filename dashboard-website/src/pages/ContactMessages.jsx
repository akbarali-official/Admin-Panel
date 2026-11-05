import React from 'react';
import CrudPage from '../components/CrudPage';

// Contact Us se aaye messages (sirf admin dekh aur delete kar sakta hai)
export default function ContactMessages() {
  return (
    <CrudPage
      title="Contact Messages"
      singular="Message"
      endpoint="/contact-messages"
      allowCreate={false}
      allowEdit={false}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'subject', label: 'Subject' },
        { key: 'message', label: 'Message', render: (row) => (row.message.length > 60 ? `${row.message.slice(0, 60)}...` : row.message) },
        { key: 'createdAt', label: 'Date', type: 'date' }
      ]}
      fields={[]}
    />
  );
}
