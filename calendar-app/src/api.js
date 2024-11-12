import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

export const getEvents = () => api.get('/events');
export const createEvent = (event) => api.post('/events', event);
export const updateEvent = (id, event) => api.put(`/events/${id}`, event);
export const deleteEvent = (id) => api.delete(`/events/${id}`);
