import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Products() {
  return (
    <CrudPage
      title="E-commerce: Products"
      singular="Product"
      endpoint="/products"
      columns={[
        { key: 'name', label: 'Product' },
        { key: 'category', label: 'Category' },
        { key: 'price', label: 'Price', type: 'money' },
        { key: 'stock', label: 'Stock' }
      ]}
      fields={[
        { name: 'name', label: 'Product Name', type: 'text', required: true },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'price', label: 'Price ($)', type: 'number', required: true },
        { name: 'stock', label: 'Stock', type: 'number', defaultValue: 0 },
        { name: 'description', label: 'Description', type: 'multiline' }
      ]}
    />
  );
}
