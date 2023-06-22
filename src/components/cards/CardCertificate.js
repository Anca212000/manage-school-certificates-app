import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CardCertifcate({ wait, dataAdeverinta }) {
    return (
    <React.Fragment>
        <CardContent>
            <Typography variant="h6" component="div" style={{textTransform: 'uppercase', fontFamily: 'Nunito, sans-serif', fontWeight: 'bold', color: '#AFA8BA'}}>
            Adeverinta
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" style={{textTransform: 'uppercase', color: '#AFA8BA'}}>
            Scop
            </Typography>
            <Typography variant="body2" style={{fontFamily: 'Nunito, sans-serif', color: '#FFFADE'}}>
                {dataAdeverinta.motiv}
            </Typography>
        </CardContent>
        <CardActions>
            <Link to={`/student-certificate/${dataAdeverinta.id}`}>
                <Button size="small" style={{fontFamily: 'Nunito, sans-serif', color: '#00E2C0', fontWeight: 'bold'}}>Vezi adeverinta <ChevronRightIcon /></Button>
            </Link>
        </CardActions>
    </React.Fragment>
   )
}