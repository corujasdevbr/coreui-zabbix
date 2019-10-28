import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ScriptListagem from './ScriptListagem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ScriptListagem /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
