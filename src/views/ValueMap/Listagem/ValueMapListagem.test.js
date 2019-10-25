import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ValueMap from './ValueMapListagem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ValueMap /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
