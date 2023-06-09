import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ClickMeGeometry from '../components/ClickMeGeometry';
import './mainPage.css';
import ScrollNavigation from '../components/ScrollNavigation/ScrollNavigation';
import MouseWarpGeometry from '../components/MouseWarpGeometry';
import BakedScene from '../components/BakedScene';
import {useEffect, useState} from "react";

const ClickMeSection = ({ id }) => {
  return (
    <Grid id={id} container height="100vh" justifyContent="center">
      <Grid xs={12} md={6} height="100%">
        <ClickMeGeometry></ClickMeGeometry>
      </Grid>
      <Grid xs={12} md={6} sx={{ p: 8, mt: 'auto', mb: 'auto' }}>
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

const BakedSceneSection = ({ id }) => {
  return (
    <Grid id={id} container height="100vh">
      <BakedScene />
    </Grid>
  );
};

const WelcomeSection = ({ id }) => {
  return (
    <Grid id={id} container height="100vh">
      <MouseWarpGeometry />
    </Grid>
  );
};

const MainPage = () => {
  const [contentConfig, setContentConfig] = useState();

  useEffect(() => {
    fetch('/content.json')
      .then((data) => data.json())
      .then((json) => setContentConfig(json));
  }, []);

  if (contentConfig == null) return;

  return (
    <>
      <Box className="scrollSnapContainer">
        {contentConfig.map((item) => {
          switch (item.component) {
            case 'WelcomeSection':
              return <WelcomeSection id={item.id} />;
            case 'ClickMeSection':
              return <ClickMeSection id={item.id} />;
            case 'BakedSceneSection':
              return <BakedSceneSection id={item.id} />;
          }
        })}
      </Box>
      <ScrollNavigation
        // activeIndex={snapIndex}
        config={contentConfig}
      />
    </>
  );
};

export default MainPage;
