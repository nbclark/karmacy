import fake from './auth.fake'
import google from './auth.google'
import slack from './auth.slack'
import def from './auth.default'

module.exports = {
  google: google,
  slack: slack,
  default: def,
  fake: fake
}