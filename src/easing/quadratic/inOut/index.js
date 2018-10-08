// MobSin.easing.quadratic.inOut

module.exports = (t) => (t < .5) ? (2 * t * t) : (-1 + (4 - 2 * t) * t);