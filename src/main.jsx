import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CalendarApp } from './CalendarApp';
import { store } from './store';

import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <CalendarApp />
    </Provider>,


)
