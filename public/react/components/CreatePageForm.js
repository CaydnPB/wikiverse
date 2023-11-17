import React, { useState } from 'react';

export const CreatePageForm = ({ onCreatePage }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    name: '',
    email: '',
    tags: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePage(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <strong>Title: </strong>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <br />
      <label>
        <strong>Content: </strong>
        <input type="text" name="content" value={formData.content} onChange={handleChange} required />
      </label>
      <br />
      <label>
        <strong>Author Name: </strong>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <br />
      <label>
        <strong>Author Email: </strong>
        <input type="text" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />
      <label>
        <strong>Tags (Optional): </strong>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Create Page</button>
    </form>
  );
};