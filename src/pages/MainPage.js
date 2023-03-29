import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TestCanvas from '../components/TestCanvas';

const MainPage = () => {
  return (
    <Grid container height="500px" justifyContent="center">
      <Grid xs={12} md={6} height="100%">
        <TestCanvas></TestCanvas>
      </Grid>
      <Grid xs={12} md={6} sx={{ p: 8 }}>
        <Typography variant="h2">{"<- Click me!"}</Typography>
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

export default MainPage;
