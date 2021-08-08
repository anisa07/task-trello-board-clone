import React from 'react';
import './App.css';
import { Board } from './pages/board/Board';
import { global, theme } from '@anisa07/design-package-app-test';
import "@fontsource/coming-soon";

function App() {
    const ThemeProvider = global.themeProvider;
  return (
      <ThemeProvider theme={theme.theme}>
          <div className="app"><Board /></div>
      </ThemeProvider>
  );
}

export default App;
