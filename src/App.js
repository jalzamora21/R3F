import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import MainPage from './pages/MainPage';
import { Leva } from 'leva';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Leva />
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
