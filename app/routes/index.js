const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../middleware/utils')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../static/swagger.json');


const uiDocsOptions = {
  // customCssUrl: '/static/style.css'
};

router.use('/api-docs', swaggerUi.serve)
router.get('/api-docs', swaggerUi.setup(swaggerDocument, uiDocsOptions));



/*
 * Load routes statically and/or dynamically
 */

// Load Auth route
router.use('/', require('./auth'))

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth' && file !== '.DS_Store'
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : ''
})


/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

module.exports = router
