import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ClickMeGeometry from '../components/ClickMeGeometry';
import './mainPage.css';
import ScrollNavigation from '../components/ScrollNavigation/ScrollNavigation';

const ClickMeSection = ({ id }) => {
  return (
    <Grid id={id} container height="500px" justifyContent="center">
      <Grid xs={12} md={6} height="100%">
        <ClickMeGeometry></ClickMeGeometry>
      </Grid>
      <Grid xs={12} md={6} sx={{ p: 8 }}>
        <Typography variant="h2">{'<- Click me!'}</Typography>
        <Typography align="justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius hic iste itaque minus
          soluta! Ad, asperiores consequatur consequuntur eos eum inventore ipsam minus neque, nisi
          nostrum quae quaerat quasi quibusdam repellendus, voluptatibus! Asperiores ea, earum eos
          eum fugit iste itaque necessitatibus nobis praesentium reiciendis sapiente sit tenetur,
          ullam unde, vitae!
        </Typography>
      </Grid>
    </Grid>
  );
};

const WelcomeSection = ({ id }) => {
  return <Grid id={id} container height="100vh"></Grid>;
};

const scrollNavConfig = [
  {
    label: 'Welcome',
    id: 'welcomeSection',
  },
  {
    label: 'Section 1',
    id: 'sec1',
  },
  {
    label: 'Section 2',
    id: 'sec2',
  },
  {
    label: 'Section 3',
    id: 'sec3',
  },
  {
    label: 'Section 4',
    id: 'sec4',
  },
];

const MainPage = () => {
  return (
    <>
      <ScrollNavigation
        // activeIndex={snapIndex}
        config={scrollNavConfig} />
      <Box className="scrollSnapContainer">
        <WelcomeSection id="welcomeSection" />
        <ClickMeSection id="sec1" />
        <ClickMeSection id="sec2" />
        <ClickMeSection id="sec3" />
        <ClickMeSection id="sec4" />
      </Box>
    </>
  );
};

export default MainPage;
