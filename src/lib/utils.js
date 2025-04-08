function sleep (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { sleep, getRandomInt }
