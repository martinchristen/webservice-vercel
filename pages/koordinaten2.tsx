import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, TextField, Typography, Paper} from '@mui/material';

const Koordinaten2 = () => {
    const [lng, setLng] = useState('0.0');
    const [lat, setLat] = useState('0.0');
    const [resultat, setResultat] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Überprüfen, ob die Geolocation-API verfügbar ist
        if ("geolocation" in navigator) {

          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLat(latitude.toString());
              setLng(longitude.toString());
            },
            (error) => {
              setError(`Fehler beim Abrufen der Position: ${error.message}`);
            }
          );
        } else {
          setError("Geolocation wird vom Browser nicht unterstützt");
        }
      }, []);

    return (
    <>
        <Paper elevation={5} style={{padding: '15px', margin: '15px', maxWidth: '400px'}}>
            <Typography variant="h5">Transform WGS84 to LV95</Typography>
            <TextField
                label="Longitude"
                type="text"
                value={lng}
                onChange={ (e) => setLng(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Latitude"
                type="text"
                value={lat}
                onChange={ (e) => setLat(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={addition}>
                Calculate
            </Button>

            {resultat !='' && (
                <Typography variant="h6">
                    Transformed: {resultat}
                </Typography>

            )}

        </Paper>
        
    </>)
}

export default Koordinaten2;