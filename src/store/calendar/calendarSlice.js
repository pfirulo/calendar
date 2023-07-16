import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns/esm';

/* const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños Bruno',
    notes: 'Hay que comprar torta',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Pablo'
    }
} */

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            //tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {

                if (event._id === payload.id) {
                    return payload;
                }
                return event;

            })
        },
        onDeleteEvent: (state) => {

            state.events = state.events.filter(event => event.id !== state.activeEvent.id);
            state.activeEvent = null;

        },
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            //state.events = payload;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event)
                }
            });
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true
            state.events = [],
            state.activeEvent = null
        },

    }
});


// Action creators are generated for each case reducer function
export const { onLoadEvents, onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLogoutCalendar } = calendarSlice.actions;