const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../helpers/utils')

/*
 * Load routes dynamically
 */

// // Load Auth route
// router.use('/', require('./auth'))

// Loop routes path and loads every file as a route except this file and auth file
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth'
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : ''
})

module.exports = router
