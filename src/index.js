import React from 'react';
import ReactDOM from 'react-dom/client';

import MarvelService from './services/MarvelService';

import '@fontsource/roboto-condensed';
import './style/index.scss';

import App from './components/App/App';

new MarvelService().getAllCharacter()
.then( res => {
    console.log(res);
})
.catch( err => {
    console.log(err);
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);