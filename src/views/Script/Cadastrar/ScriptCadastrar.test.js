import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ScriptCadastrar from './ScriptCadastrar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ScriptCadastrar /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
