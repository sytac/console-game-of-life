/* Conways game of life 


For a space that is 'populated':
    Each cell with one or no neighbors dies, as if by solitude. 
    Each cell with four or more neighbors dies, as if by overpopulation. 
    Each cell with two or three neighbors survives. 

For a space that is 'empty' or 'unpopulated'
    Each cell with three neighbors becomes populated. 

*/


function range(n) {
	let ret = [];
	for (let i = 0; i < n; i += 1) {
		ret.push(i);
	}
	return ret;
}

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function Grid(rows, cols, positions) {
	let matrix = [];
	const rr = range(rows);
	const rc = range(cols);
	const colBorder = "|";
	const rowBorder = "-";
	const fill = "X";
	const empty = " ";
	const coords = [];

	initialize();

	function initialize() {
		for (let i = 0; i < rows; i += 1) {
			let internal = [];
			for (let j = 0; j < cols; j += 1) {
				coords.push([i, j]);
				internal.push(empty);
			}
			matrix.push(internal);
		}
		for (let [i, j] of positions) matrix[i][j] = fill;
	}

	function show() {
		return bordered().map(_ => _.join("")).join("\n");
	}

	function bordered() {
		const copy = matrix.slice();
		const rowBordering = [" "].concat(rc.map(_ => rowBorder)).concat([" "]);
		
		rr.map(i => {
			let col = matrix[i].slice();
			col.push(colBorder);
			col.unshift(colBorder);
			copy[i] = col;
		})	
		copy.push(rowBordering);
		copy.unshift(rowBordering);
		return copy;
	}

	function inBounds(i, j) {
		return i >= 0 && i < rows && j >= 0 && j < cols
	}

	function neighbors(row, col) {
		const ret = [];
		for (let i = row - 1; i <= row + 1; i += 1) {
			for (let j = col - 1; j <= col + 1; j += 1) {
				if (inBounds(i, j) && (i !== row || j !== col)) {
					ret.push([i, j]);
				}
			}
		}
		return ret;
	}

	function isFull(i, j) {
		return matrix[i][j] === fill;
	}

	function isEmpty(i, j) {
		return !isFull(i, j);
	}

	function cells() {
		return coords.reduce((acc, [i, j]) => {
			if (isFull(i, j)) acc.push([i, j]);
			return acc;
		}, []);
	}

	function mapCell(fn) {
		return cells().map(fn);
	}

	function neighborCount() {
		const copy = matrix.map(_ => _.map(_ => 0));
		cells().map(([i, j]) => neighbors(i, j).map(([_i, _j]) => copy[_i][_j] += 1));
		return copy;
	}

	function lonely(nc) {
		return coords.filter(([i, j]) => nc[i][j] <= 1);
	}

	function stuffed(nc) {
		return coords.filter(([i, j]) => nc[i][j] >= 4);
	}

	function expected(nc) {
		return coords.filter(([i, j]) => nc[i][j] === 3);
	}

	function c2s([i, j]) {
		return `${i},${j}`;
	}

	return {
		evolve() {
			const nc = neighborCount();
			const toKill = new Set(lonely(nc).concat(stuffed(nc)).map(c2s));
			const toCreate = expected(nc);
			let newCoords = coords.filter(([i, j]) => !toKill.has(c2s([i, j])) && isFull(i, j)).concat(toCreate);
			return Grid(rows, cols, newCoords);
		},
		show
	}
}


function evolve(grid) {
	range(10).map(_ =>  {
		grid = grid.evolve();
		grid.print();
	});
} 

window.Grid = Grid;
// const rows = 6;
// const cols = 6;
// var grid = Grid(rows, cols, [[1, 1], [1, 2], [2, 1], [2, 2], [3, 3], [3, 4], [4, 3], [4, 4]]);
