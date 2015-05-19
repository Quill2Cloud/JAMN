// EVENTS
// Log events for all users
// Do not allow events to be updated
// Do not allow events to be removed
Collections.events.permit('insert').apply();
Collections.events.permit('update').never().apply();
Collections.events.permit('remove').never().apply();
