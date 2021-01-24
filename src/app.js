const path = require('path')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const express = require('express')

const app = express()

// setting Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up Handle Bars engine and veiws location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'PF you know'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'PF you know'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'this is sooo helpful',
        title: 'HELP',
        name: 'PF you know'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address){
        return res.send({
            error: 'come on guys I need an address to work with'
        })
    }
 
    geocode(req.query.address, (error, {lat, long, location}={}) => {

        if (error) {
            return res.send({error})
        }

        forecast(lat, long, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                    forecast: forecastdata,
                    location,
                    address: req.query.address
                })
    
        })
    })
})

app.get('/products', (req, res) =>{
    if (!req.query.search){
        return res.send({
            error: 'Come on guys need a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errText: 'this help is missing some ingreadients',
        title: '404',
        name: 'PF you know'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errText: 'Say WHAT.....',
        title: '404',
        name: 'PF you know'
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('server is up on 3000')
})