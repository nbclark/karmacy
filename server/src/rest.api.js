const path = require('path')
const express = require('express')
const HorizonClient = require('@horizon/client')

module.exports = class {
  constructor() {
  }

  init(conn) {
    this.conn = conn
  }

  registerRoutes(subRoute) {
    subRoute.use((req, res, next) => {
    })

    subRoute.get('/xxx', (req, res) => {
      res.json({})
    })
  }
}