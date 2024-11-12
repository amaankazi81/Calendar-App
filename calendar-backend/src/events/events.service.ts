import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './create-event.dto';

@Injectable()
export class EventsService {
  private events = []; 

  create(event: CreateEventDto) {
    const newEvent = { id: Date.now(), ...event };
    this.events.push(newEvent);
    return newEvent;
  }

  findAll() {
    return this.events;
  }

  findOne(id: number) {
    const event = this.events.find(event => event.id === id);
    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);
    return event;
  }

  update(id: number, updateEventDto: CreateEventDto) {
    const eventIndex = this.events.findIndex(event => event.id === id);
    if (eventIndex === -1) throw new NotFoundException(`Event with ID ${id} not found`);
    
    this.events[eventIndex] = { ...this.events[eventIndex], ...updateEventDto };
    return this.events[eventIndex];
  }

  delete(id: number) {
    const eventIndex = this.events.findIndex(event => event.id === id);
    if (eventIndex === -1) throw new NotFoundException(`Event with ID ${id} not found`);
    
    const deletedEvent = this.events.splice(eventIndex, 1);
    return deletedEvent;
  }
}
