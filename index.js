const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/', require('./routes'));

// set up the view engine

app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err)
{
    if(err)
    {
        return console.log(`Error in running in server: ${err}`);
    }
    return console.log(`Server is up and running on port: ${port}`);
});