import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import EsqueciSenha from './EsqueciSenha';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><EsqueciSenha/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
