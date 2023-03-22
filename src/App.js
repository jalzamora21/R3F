import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import MainPage from './pages/MainPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
};

export default App;