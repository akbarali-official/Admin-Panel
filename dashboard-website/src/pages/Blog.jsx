import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Blog() {
  return (
    <CrudPage
      title="Blog"
      singular="Post"
      endpoint="/posts"
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'author', label: 'Author' },
        { key: 'status', label: 'Status', type: 'status', colors: { published: 'success', draft: 'default' } },
        { key: 'createdAt', label: 'Created', type: 'date' }
      ]}
      fields={[
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'author', label: 'Author', type: 'text' },
        { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft' },
        { name: 'content', label: 'Content', type: 'multiline', required: true }
      ]}
    />
  );
}
