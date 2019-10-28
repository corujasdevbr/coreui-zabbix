import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import AlertListagem from './AlertListagem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AlertListagem /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
