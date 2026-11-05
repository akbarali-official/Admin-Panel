import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Orders() {
  return (
    <CrudPage
      title="Orders"
      singular="Order"
      endpoint="/orders"
      columns={[
        { key: 'customer', label: 'Customer' },
        { key: 'amount', label: 'Amount', type: 'money' },
        {
          key: 'status',
          label: 'Status',
          type: 'status',
          colors: { completed: 'success', pending: 'warning', cancelled: 'error' }
        },
        { key: 'date', label: 'Date', type: 'date' }
      ]}
      fields={[
        { name: 'customer', label: 'Customer', type: 'text' },
        { name: 'amount', label: 'Amount ($)', type: 'number', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['pending', 'completed', 'cancelled'], defaultValue: 'completed' },
        { name: 'date', label: 'Date', type: 'date' }
      ]}
    />
  );
}
