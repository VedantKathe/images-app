import React, { useEffect, useState } from "react";
import { config } from "../App";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { addImages, getAllImages } from "../../src/features/images/imagesSlice";
import "./Gallery.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    CssBaseline,
    TextField,
    InputAdornment,
    Box,
    Grid,
    Container
} from '@mui/material';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import ImageIcon from '@mui/icons-material/Image';
import ImageCard from "./ImageCard";

const theme = createTheme();

const Gallery = () => {

    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const [timerId, setTimerId] = useState(null);

    const performAPICall = async (URL) => {
        try {
            const response = await axios.get(URL);
            dispatch(addImages(response.data));
        } catch (e) {
            if (e.response && e.response.data.message) {
                enqueueSnackbar(e.response.data.message, { variant: "error" });
            } else {
                enqueueSnackbar("Something went wrong", { variant: "error" });
            }
        }
    };

    const performSearch = async(event) => {
        let URL = `https://api.unsplash.com/search/photos?query=${event.target.value}&client_id=IWDnBEfwp1GwcL4H6Yh7DaTQ4yMeyu33B528sJN9vOE`
        if (event.target.value === ""){
            performAPICall(`${config.endpoint}?client_id=IWDnBEfwp1GwcL4H6Yh7DaTQ4yMeyu33B528sJN9vOE`);
        }else{
            try {
                const response = await axios.get(URL);
                dispatch(addImages(response.data.results));
            } catch (e) {
                if (e.response && e.response.data.message) {
                    enqueueSnackbar(e.response.data.message, { variant: "error" });
                } else {
                    enqueueSnackbar("Something went wrong", { variant: "error" });
                }
            }
        }
    }

    const debounceSearch = (event, debounceTimeout) => {
        if (timerId) {
          clearTimeout(timerId);
        }
        const debounceTimeoutId = setTimeout(
          () => performSearch(event),
          debounceTimeout
        );
        setTimerId(debounceTimeoutId);
      };

    const imagesList = useSelector(getAllImages);

    useEffect(() => {
        const URL = `${config.endpoint}?client_id=IWDnBEfwp1GwcL4H6Yh7DaTQ4yMeyu33B528sJN9vOE`
        performAPICall(URL);
        // eslint-disable-next-line
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <AppBar position="relative" sx={{ width: '100%' }}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                        <ImageIcon />
                        <TextField
                            className="search-desktop"
                            placeholder="Search"
                            size="small"
                            inputProps={{ style: { fontFamily: "Arial", color: "black" } }}
                            InputProps={{
                                className: "search",
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ImageSearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            name="search"
                            onChange={(event) => debounceSearch(event, 500)}
                        />
                    </Toolbar>
                </AppBar>
                <TextField
                    className="search-mobile"
                    size="small"
                    fullWidth
                    inputProps={{ style: { fontFamily: "Arial", color: "black" } }}
                    InputProps={{
                        className: "search",
                        startAdornment: (
                            <InputAdornment position="start">
                                <ImageSearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    placeholder="Search"
                    name="search"
                    onChange={(event) => debounceSearch(event, 500)}
                />
                <Container sx={{ px: 2, py: 8, height: 200 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={12}>
                        {imagesList.map((image, index) => (
                            <Grid item key={image.id} xs={12} sm={6} md={4}>
                                <ImageCard index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Gallery;