let state = {
  speed: 500
}

const block1 = `0F000
00X00
000G0
`

const block2 = `00F00
00000
00X0G
`

function* blocks() {
  while(true) {
    yield block1;
    yield block2;
  }
}

const style = {
  'X': 'color: #ff0000;background: #000;',
  'F': 'color: #00ff00;background: #000;',
  'G': 'color: #0000ff;background: #000;'
}

const life = new ConsoleAnimation(state, blocks, style);
life.start();
