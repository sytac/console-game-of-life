let state = {
  speed: 50
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



function conway(rows, cols, positions) {
	return function*() {
		let grid = Grid(rows, cols, positions);
		while(true) {
			yield grid.show();
			grid = grid.evolve();
		}
	}
}
function glider() {
	const positions = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
	return conway(20, 50, positions);
}

function gun() {
	const positions = [[5, 1], [5, 2], [6, 1], [6, 2], [5, 11], [6, 11], [7, 11], [4, 12], [3, 13], [3, 14], [8, 12], [9, 13], [9, 14], [6, 15], [4, 16], [5, 17], [6, 17], [7, 17], [6, 18], [8, 16], [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25], [3, 35], [4, 35], [3, 36], [4, 36]];
	return conway(30, 50, positions)
}


const life = new ConsoleAnimation(state, gun(), {});
life.start();


