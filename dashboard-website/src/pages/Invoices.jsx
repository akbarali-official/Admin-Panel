import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Invoices() {
  return (
    <CrudPage
      title="Invoices"
      singular="Invoice"
      endpoint="/invoices"
      columns={[
        { key: 'invoiceNumber', label: 'Invoice #' },
        { key: 'customer', label: 'Customer' },
        { key: 'amount', label: 'Amount', type: 'money' },
        { key: 'status', label: 'Status', type: 'status', colors: { paid: 'success', pending: 'warning', overdue: 'error' } },
        { key: 'dueDate', label: 'Due Date', type: 'date' }
      ]}
      fields={[
        {
          name: 'invoiceNumber',
          label: 'Invoice Number',
          type: 'text',
          helperText: 'Khali chhodo to khud ban jayega (INV-xxxxxx)'
        },
        { name: 'customer', label: 'Customer', type: 'text', required: true },
        { name: 'amount', label: 'Amount ($)', type: 'number', required: true },
        { name: 'status', label: 'Status', type: 'select', options: ['pending', 'paid', 'overdue'], defaultValue: 'pending' },
        { name: 'dueDate', label: 'Due Date', type: 'date' },
        { name: 'notes', label: 'Notes', type: 'multiline' }
      ]}
    />
  );
}
