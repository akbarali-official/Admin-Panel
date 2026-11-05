import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Users() {
  return (
    <CrudPage
      title="Users"
      singular="User"
      endpoint="/users"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role', type: 'status', colors: { admin: 'primary', user: 'default' } },
        { key: 'createdAt', label: 'Joined', type: 'date' }
      ]}
      fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'text', required: true },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          requiredOnCreate: true,
          helperText: 'Edit karte waqt khali chhodo to password nahi badlega'
        },
        { name: 'role', label: 'Role', type: 'select', options: ['user', 'admin'], defaultValue: 'user' }
      ]}
    />
  );
}
