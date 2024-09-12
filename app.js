const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results

app.engine('hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  const keyword = req.query.search?.trim()
  const matchedrestaurants = keyword ? restaurants.filter((rst) => {
    return Object.keys(rst).some((property) => {
      if (property === 'name' || property === "category") {
        return rst[property].toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  }) : restaurants
  res.render('index', { restaurants: matchedrestaurants, keyword })
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((restaurant) => {
    return restaurant.id.toString() === id
  })
  res.render('detail', { restaurant })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})