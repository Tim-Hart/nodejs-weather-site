const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Definr Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: "Tim Hart"
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Page',
        name: "Tim Hart"
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Page',
        name:'Tim Hart',
        message: 'Enter your location to find out the weather',
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

    geoCode(req.query.address, (error,{location, longitude, latitude}= {}) => {
    
        if (error){
        return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                forecast:forecastData,
                address: req.query.address
            })
    
    
          })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Tim Hart',
        error:'Help article not found'
    })

})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Tim Hart',
        error:'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})