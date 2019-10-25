import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ServicesListagem from './ServicesListagem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ServicesListagem /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
