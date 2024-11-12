# Calendar App

A simple and interactive calendar application that allows users to create, edit, delete, and view events on specific dates. The app includes a notification feature to alert users of upcoming events with a snooze option.

## Features

- **View Calendar**: Monthly calendar view with marked dates for scheduled events.
- **Create Events**: Add events with a title and description on specific dates.
- **Edit Events**: Modify details of an existing event.
- **Delete Events**: Remove events that are no longer needed.
- **Notifications**: Receive browser notifications when an event is about to start, with a snooze option to delay the notification by 5 minutes.

## Technologies Used

- **Frontend**: React, `react-calendar` for calendar display, HTML and CSS.
- **Backend**: NestJs.
- **Notifications**: Web Notifications API for browser notifications.

## Project Workflow

Select a Date: Click on a date in the calendar to view or create events.

![C1](https://github.com/user-attachments/assets/814e2025-2f0f-4261-bc85-6d1b548e6da5)

Add Event: Click on a date and fill in the form with the event title and description, then click "Submit".

![C2](https://github.com/user-attachments/assets/ba91b584-499e-4986-841d-3c0337f040d2)
![C3](https://github.com/user-attachments/assets/1adb60df-e829-4e04-b7f7-c9a00df34dcc)

Edit Event: Use the "Edit" button next to an event to modify its details.

![C4](https://github.com/user-attachments/assets/4a23213b-f8f1-43ec-a8d2-5fb9a09dc688)
![C5](https://github.com/user-attachments/assets/abeea14f-d548-4191-87c4-c74c2dccbd0c)

Delete Event: Use the "Delete" button next to an event to remove it.

![C6](https://github.com/user-attachments/assets/05f2b21a-24f3-409c-88ff-4d72434d515c)
![C7](https://github.com/user-attachments/assets/2eadce85-2a1e-4ad0-8c65-c41eee891047)


**Notification Permissions:**
To enable notifications, the app will request permission from the browser. Make sure to allow notifications when prompted to receive event reminders.

**API**
**The app relies on the following API functions in api.js:**

getEvents(): Fetches all events.

createEvent(eventData): Creates a new event.

updateEvent(eventId, eventData): Updates an existing event.

deleteEvent(eventId): Deletes an event.


## Getting Started

### Prerequisites

- **Node.js** (>= 14.x recommended)
- **npm** (>= 6.x recommended)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/calendar-app.git

2. Navigate to the project directory:

   ```bash
   cd calendar-app

3. Install the dependencies:

   ```bash
   npm install

4. Start the development server:

   ```bash
   npm run start

5. Start Frontent:
   ```bash
   npm start

Frontent will start at http://localhost:3001

Backend will host at http://localhost:3000 

## License

This project is licensed under the MIT License.
