import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Customers() {
  return (
    <CrudPage
      title="Customers"
      singular="Customer"
      endpoint="/customers"
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'company', label: 'Company' },
        { key: 'status', label: 'Status', type: 'status', colors: { active: 'success', lead: 'warning', inactive: 'default' } }
      ]}
      fields={[
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'company', label: 'Company', type: 'text' },
        { name: 'status', label: 'Status', type: 'select', options: ['lead', 'active', 'inactive'], defaultValue: 'lead' }
      ]}
    />
  );
}
