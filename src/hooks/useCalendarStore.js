import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } from "../store";




export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {

            if (calendarEvent.id) {
                // actualizando
                const { data } = await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

                if (data.ok) Swal.fire('Actualización', 'Se actualizó correctamente.', 'success');               
                dispatch(onUpdateEvent({ ...calendarEvent, user }));
                return;
            }
            // creando
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');

        }

    }

 const startDeletingEvent = async() => {
        try {
            
            const { data } = await calendarApi.delete(`/events/${activeEvent.id}`);
            console.log(data);
            if (data.ok) Swal.fire('Borrado de nota', 'Se elimino correctamente.', 'success');               
            dispatch(onDeleteEvent());
            return;
            
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');            
        }
        
    } 


    const startLoadingEvents = async () => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log('Error cargando eventos.');
            console.log(error);

        }
    }



    return {
        // propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // métodos
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
        startDeletingEvent
    }
}
