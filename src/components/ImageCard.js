import { Card, CardActions, CardMedia, IconButton, CardContent, Typography, Box } from '@mui/material';
import React from 'react';
import { useSelector } from "react-redux";
import EastIcon from '@mui/icons-material/East';
import { useHistory } from "react-router-dom";
import { getAllImages } from "../../src/features/images/imagesSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';

const ImageCard = ({ index }) => {

    const imagesList = useSelector(getAllImages);
    const history = useHistory();

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: 1,
            borderColor: 'text.primary'
        }}>
            <CardMedia
                component="img"
                image={imagesList[index].urls.thumb}
                alt="random"
                sx={{
                    height: '300px'
                }}
            />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexGrow: 1
                    }}
                >
                    <FavoriteIcon sx={{ color: pink[500], mt: 0.5, mr: 0.5 }} />
                    <Typography gutterBottom variant="h5" component="h2">
                        {imagesList[index].likes}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton
                        variant="contained"
                        color="primary"
                        sx={{ border: 2, borderColor: 'primary.main' }}
                        onClick={() => history.push(`/image/${imagesList[index].id}`)}
                    >
                        <EastIcon />
                    </IconButton>
                </CardActions>
            </Box>
        </Card>
    );
};

export default ImageCard