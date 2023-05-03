
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import config from "../config/config";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function ListDocuments() {
  const history = useHistory();
  const [document, setDocument] = useState([])

  const [docUrl, setDocUrl] = useState([])
  const classes = useStyles();


  const handleChange = (event) => {
    setDocument(event.target.value)
  };

  const handleOpenLink = () => {
    window.open(`${config.backendURL}/doc/${document}`, '_blank');

  };





  useEffect(() => {
    let getPdfDocumenta = async () => {

      let doc = await axios.get(`${config.backendURL}/api/real-t/users/list_document`)

      const docList = doc.data.map(doc => ({
        name: doc, // Remove .pdf extension
        url: `${config.backendURL}/doc/${doc}` // Replace with your own URL
      }));


      setDocUrl(docList)

    }
    getPdfDocumenta()

  }, [])


  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Assignment</h1>
        </Grid>

        {docUrl.map((link) => (
          <Grid item xs={12} sm={6} md={4}>
            <Paper className={classes.paper}>

              <div>
                <embed type="application/pdf"
                  //src="https://www.africau.edu/images/default/sample.pdf"

                  src={`${config.backendURL}/doc/${link.name}`}

                  width="100%" height="500px"></embed>



              </div>

              <h2>{link.name}</h2>
              <Button



                onClick={() => {
                  
                  history.push({
                    pathname: '/real-t/add-property',
                    state: { doc: link.name }
                  });
                }}



                variant="contained" color="primary" className={classes.button}>
                Select
              </Button>
            </Paper>
          </Grid>


        ))}


      </Grid>
    </div>
  );
}

export default ListDocuments;
