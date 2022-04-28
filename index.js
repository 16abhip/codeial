const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err)
{
    if(err)
    {
        return console.log(`Error in running in server: ${err}`);
    }
    return console.log(`Server is up and running on port: ${port}`);
});