const path = require('path')
const express = require('express')

module.exports = class {
  constructor() {
  }

  init() {
  }

  registerRoutes(subRoute: any) {
    subRoute.use((req: any, res: any, next: any): any => {
    })

    subRoute.get('/xxx', (req: any, res: any) => {
      res.json({})
    })
  }
}