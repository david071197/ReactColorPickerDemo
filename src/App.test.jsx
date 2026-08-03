import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { it } from 'vitest';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const root = createRoot(div);
  act(() => root.render(<App />));
  act(() => root.unmount());
  div.remove();
});
