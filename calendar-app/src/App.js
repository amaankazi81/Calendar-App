import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getEvents, createEvent, updateEvent, deleteEvent } from './api';
import EventForm from './Components/EventForm';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');  

  useEffect(() => {
    fetchEvents();
    requestNotificationPermission();
  }, []);

  const fetchEvents = async () => {
    const response = await getEvents();
    setEvents(response.data);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearchQuery = event.title.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesFilterType = 
      filterType === 'all' ||
      (filterType === 'media' && event.mediaUrl) ||
      (filterType === 'text' && !event.mediaUrl);
  
    return matchesSearchQuery && matchesFilterType;
  });


  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
    setEditingEvent(null);
  };

  const handleEventSubmit = async (eventData) => {
    let event;
    if (editingEvent) {
      event = await updateEvent(editingEvent.id, eventData);
    } else {
      event = await createEvent({ ...eventData, date: selectedDate });
    }
    setShowForm(false);
    fetchEvents();
    scheduleNotification(event);
  };

  const scheduleNotification = (event) => {
    const eventTime = new Date(event.date);
    const now = new Date();

    if (eventTime > now) {
      const timeout = eventTime.getTime() - now.getTime();
      setTimeout(() => showNotification(event), timeout);
    }
  };

  const showNotification = (event) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification(`Event: ${event.title}`, {
        body: `Event is starting now. ${event.description || ''}`,
        tag: event.id,
        requireInteraction: true,
      });

      notification.onclick = () => {
        notification.close();
        setTimeout(() => showNotification(event), 300000); 
      };
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteEvent = async (eventId) => {
    await deleteEvent(eventId);
    fetchEvents();
    alert('Event Deleted Successfully!')
  };

  const eventsOnSelectedDate = events.filter(
    (event) => new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  const hasEventOnDate = (date) => {
    return events.some((event) => new Date(event.date).toDateString() === date.toDateString());
  };

  return (
    <div className="App">
      <h1>Calendar App</h1>
      <div className="calender">
      <Calendar id='cal' view='month' value={selectedDate} onClickDay={handleDateClick} tileClassName={({ date, view }) => 
          view === 'month' && hasEventOnDate(date) ? 'marked-date' : null
        } />
      </div>
      <h2>Events on {selectedDate.toDateString()}</h2>
      <ul className='ulbtn'>
        {eventsOnSelectedDate.length > 0 ? (
          eventsOnSelectedDate.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong> - {event.description}
              <button onClick={() => handleEditEvent(event)}>Edit</button> 
              <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p id='noevent'>No events on this date.</p>
        )}
      </ul>


      {showForm && (
        <EventForm
          selectedDate={selectedDate}
          onSubmit={handleEventSubmit}
          onCancel={() => setShowForm(false)}
          initialData={editingEvent}
        />
      )}
    </div>
  );
}

export default App;
