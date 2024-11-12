import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../api';
import EventForm from './EventForm';

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    getEvents().then((response) => setEvents(response.data));
  }, []);

  const addEvent = (eventData) => {
    createEvent(eventData).then((response) => {
      setEvents([...events, response.data]);
    });
  };

  return (
    <div>
      <Calendar
        value={selectedDate}
        onClickDay={(date) => setSelectedDate(date)}
      />
      <EventForm onSubmit={addEvent} />
    </div>
  );
}

export default CalendarComponent;
