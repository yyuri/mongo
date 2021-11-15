const HOURS_TO_BLOCK = 2

const { buildErrObject } = require('../../../middleware/utils')
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}
/**
 * Blocks a user by setting blockExpires to the specified date based on constant HOURS_TO_BLOCK
 * @param {Object} user - user object
 */
const blockUser = (user = {}) => {
  return new Promise((resolve, reject) => {
    user.blockExpires = new Date() + HOURS_TO_BLOCK
    user.save((err, result) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      if (result) {
        return resolve(buildErrObject(409, 'BLOCKED_USER'))
      }
    })
  })
}

module.exports = { blockUser }
