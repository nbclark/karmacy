const path = require('path')
const fs = require('fs')
const toml = require('toml')

const token_secret = toml.parse(fs.readFileSync(path.join(__dirname, '../.hz/secrets.toml'))).token_secret;

module.exports = {
  pgsql: {

  },
  horizon: {
    rdb_host: 'localhost',
    project_name: 'karmacy',
    permissions: true,
    auto_create_index: true,
    auto_create_collection: true,
    auth: { token_secret: token_secret }
  }
}
