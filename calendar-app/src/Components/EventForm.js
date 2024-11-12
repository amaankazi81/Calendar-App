import React, { useState, useEffect } from 'react';

function EventForm({ onSubmit, onCancel, selectedDate, initialData }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setMediaUrl(initialData.mediaUrl || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      setError('Title is required');
      return;
    }
    if (!description) {
      setError('Description is required');
      return;
    }
    if (!selectedDate) {
      setError('Event date is required');
      return;
    }
    setError('');
    onSubmit({ title, description, mediaUrl }, alert('Event Added Successfully'));
    setTitle('');
    setDescription('');
    setMediaUrl('');
  };

  return (
    <div className="event-form">
      <h3>{initialData ? 'Edit Event' : 'New Event'} on {selectedDate.toDateString()}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="url"
          placeholder="Media URL (optional)"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Save Event</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EventForm;
