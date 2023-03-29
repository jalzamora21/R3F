import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import MainPage from './pages/MainPage';
import { Leva } from 'leva';
import ScrollNavigation from './components/ScrollNavigation/ScrollNavigation';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Leva hidden={true} />
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
};

export default App;
