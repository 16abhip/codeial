const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
// use express router

// extract style and script from sub pages into the layout

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));
// static files

app.use(express.static('./assets'));

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