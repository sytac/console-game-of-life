function ConsoleAnimation(state, generator, style) {
  this.state = state
  this.generator = generator()
  this.style = style
  this.stop = false
}

const a = ConsoleAnimation.prototype

a.start = function() {
  this.print(this.getNextFrame())
  this.next()
}

a.stop = function() {
  this.stop = true
}

a.updateState = function(state) {
  Object.assign(this.state, state)
}

a.getNextFrame = function() {
  return colorize(this.generator.next().value, this.style, 'color: #000;background: orange;')
}

a.next = function() {
  setTimeout(function() {
    this.print(this.getNextFrame())
    if (this.stop) {
      this.stop = false
    } else {
      this.next()
    }
  }.bind(this), state.speed)
}

a.print = function(frame) {
  console.clear()
  console.log.apply(console, frame);
}

///////////////////

function colorize(frame, map, defaultStyle) {
  let styles = [defaultStyle]
  frameArray = []

  frame.split('').map(char => {
    Object.keys(map).map(key => {
      if (char === key) {
        styles.push(map[key])
        styles.push(defaultStyle)
        const wraped = {}
        wraped[char] = `%c${char}%c`
        frameArray.push(wraped)
      }
    })
  })

  for(let i = 0;i < frameArray.length;i++) {
    keys = Object.keys(frameArray[i])
    frame = frame.replace(keys[0], frameArray[i][keys[0]])
  }

  return [`%c${frame}`].concat(styles)
}
