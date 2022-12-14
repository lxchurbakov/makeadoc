import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SomePage from './page';

const app = document.getElementById('app');

ReactDOM.render((
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SomePage />} />
        </Routes>    
    </BrowserRouter>
), app);
