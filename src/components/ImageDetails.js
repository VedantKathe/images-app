import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {
  CssBaseline,
  Box,
  Grid,
  Typography,
  Paper,
  IconButton
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import { getAllImages } from "../../src/features/images/imagesSlice";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "react-share";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { saveAs } from 'file-saver'

const theme = createTheme();

const ImageDetails = () => {

  const imagesList = useSelector(getAllImages);
  const params = useParams();
  const [currImg, setCurrImg] = useState()

  const getImageData = (id) => {
    const currPhoto = imagesList.find(x => x.id === id);
    setCurrImg(currPhoto);
  };

  const downloadImage = () => {
    saveAs(`${currImg.links.download}`, 'image.jpg') // Put your image url here.
  }

  useEffect(() => {
    getImageData(params.id);
    // eslint-disable-next-line
  }, [params.id]);


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${currImg?.urls?.regular})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <IconButton
              variant="contained"
              color="primary"
              sx={{ border: 2, margin: 2, borderColor: 'primary.main' }}
              onClick={downloadImage}
            >
              <FileDownloadIcon />
            </IconButton>
            <Typography component="h1" variant="h5">
              Download
            </Typography>
            <Box sx={{ pt: 5, mt: 5 }}>
              <FacebookShareButton
                url={currImg?.urls?.regular}
                style={{ margin: 2 }}>
                <FacebookIcon round={true} />
              </FacebookShareButton >
              <WhatsappShareButton
                url={currImg?.urls?.regular}
                style={{ margin: 2 }}>
                <WhatsappIcon round={true} />
              </WhatsappShareButton >
              <LinkedinShareButton
                url={currImg?.urls?.regular}
                style={{ margin: 2 }}>
                <LinkedinIcon round={true} />
              </LinkedinShareButton >
              <EmailShareButton
                url={currImg?.urls?.regular}
                style={{ margin: 2 }}>
                <EmailIcon round={true} />
              </EmailShareButton >
            </Box>
            <Typography component="h1" variant="h5">
              Share
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );

};

export default ImageDetails;