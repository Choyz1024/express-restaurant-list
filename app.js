const express = require('express')
const exphbs = require('express-handlebars')
const restaurantsList = require('./restaurant.json').results

const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurantsList })
})

app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantList = restaurantsList.find((restaurant) => restaurant.id.toString() === req.params.restaurantId)
  res.render('show', { restaurantList })
})

app.get('/search', (req, res) => {
  const input = req.query.keywords
  const keyword = input.trim().toLowerCase()
  const filterRestaurantsList = restaurantsList.filter(
    (restaurant) => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  )
  res.render('index', { restaurantsList: filterRestaurantsList, input })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
