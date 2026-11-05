import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Stocks() {
  const yesNo = [
    { value: 'true', label: 'yes' },
    { value: 'false', label: 'no' }
  ];

  return (
    <CrudPage
      title="Popular Stocks"
      singular="Stock"
      endpoint="/stocks"
      columns={[
        { key: 'name', label: 'Stock' },
        { key: 'amount', label: 'Amount', type: 'money' },
        { key: 'changePercent', label: 'Change %' },
        {
          key: 'isProfit',
          label: 'Result',
          render: (row) => (row.isProfit ? 'Profit' : 'Loss')
        },
        { key: 'featured', label: 'Featured', render: (row) => (row.featured ? 'Yes' : '—') }
      ]}
      fields={[
        { name: 'name', label: 'Stock Name', type: 'text', required: true },
        { name: 'amount', label: 'Amount ($)', type: 'number', required: true },
        { name: 'changePercent', label: 'Change %', type: 'number', defaultValue: 0 },
        {
          name: 'isProfit',
          label: 'Profit?',
          type: 'select',
          valueType: 'boolean',
          options: yesNo,
          defaultValue: 'true',
          helperText: 'yes = profit, no = loss'
        },
        {
          name: 'featured',
          label: 'Featured? (dashboard par bada chart)',
          type: 'select',
          valueType: 'boolean',
          options: yesNo,
          defaultValue: 'false'
        }
      ]}
    />
  );
}
