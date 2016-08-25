/* Conways game of life 


For a space that is 'populated':
    Each cell with one or no neighbors dies, as if by solitude. 
    Each cell with four or more neighbors dies, as if by overpopulation. 
    Each cell with two or three neighbors survives. 

For a space that is 'empty' or 'unpopulated'
    Each cell with three neighbors becomes populated. 

*/

function range(...args) {
	let start;
	let end;
	let step;

	if (args.length == 1) {
		start = 0;
		end = args[0];
		step = 1;
	} else if (args.length == 2) {
		start = args[0];
		end = args[1];
		step = 1;
	} else {
		start = args[0];
		end = args[1];
		step = args[2] || 1;
	}

	let ret = [];
	for (let i = start; i < end; i += step) {
		ret.push(i);
	}
	return ret;
}

function centerPad(str, len, char=" ") {
	const rem = len - str.length;
	const left = Math.floor(rem / 2);
	const right = rem - left;
	return Array.from(new Array(left), _ => char).concat(Array.from(str)).concat(Array.from(new Array(right), _ => char));
}

function rangeIn(...args) {
	if (args.length > 1) {
		return range(args[0], args[1] + 1, args[2]);
	} else {
		return range(args[0] + 1);
	}
}

function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function Grid(rows, cols, positions) {
	const colBorder = "|";
	const rowBorder = "-";
	const fill = "X";
	const empty = " ";
	const matrix = range(rows).map(_ => Array.from(new Array(cols), _ => empty))
	const coords = range(0, rows).map(i => range(0, cols).map(j => [i, j])).reduce((a, b) => a.concat(b));

	for (let [i, j] of positions) matrix[i][j] = fill;

	function bordered() {
		const copy = matrix.slice();
		const rowBordering = [" "].concat(range(cols).map(_ => rowBorder)).concat([" "]);
		
		range(rows).map(i => {
			let col = matrix[i].slice();
			col.push(colBorder);
			col.unshift(colBorder);
			copy[i] = col;
		});
		copy.push(rowBordering);
		copy.unshift(rowBordering);
		copy.push(centerPad("We are hiring!", cols + 2))
		copy.push(centerPad('www.sytac.nl/vacatures/', cols + 2));
		copy.push(centerPad("", cols + 2));
		copy.push(centerPad("Please use Firefox if you are experiencing glitches", cols + 2));
		copy.push(centerPad("", cols + 2));
		return copy;
	}

	function neighbors(row, col) {
		return (
			rangeIn(row - 1, row + 1).map(i => 
				rangeIn(col - 1, col + 1).map(j => [i, j]))
			.reduce((a, b) => a.concat(b))
			.filter(([i, j]) => inBounds(i, j) && (i !== row || j !== col)));
	}

	function neighborCount() {
		const copy = matrix.map(_ => _.map(_ => 0));
		cells().map(([i, j]) => neighbors(i, j).map(([_i, _j]) => copy[_i][_j] += 1));
		return copy;
	}

	function show() { return bordered().map(_ => _.join("")).join("\n");}

	function inBounds(i, j) { return i >= 0 && i < rows && j >= 0 && j < cols; }

	function isFull(i, j) { return matrix[i][j] === fill; }

	function isEmpty(i, j) { return !isFull(i, j);}

	function cells() { return coords.filter(([i, j]) => isFull(i, j));}

	function mapCell(fn) { return cells().map(fn);}

	function lonely(nc) { return coords.filter(([i, j]) => nc[i][j] <= 1);}

	function packed(nc) { return coords.filter(([i, j]) => nc[i][j] >= 4);}

	function expected(nc) { return coords.filter(([i, j]) => nc[i][j] === 3);}

	function c2s([i, j]) { return i + "," + j;}

	return {
		evolve() {
			const nc = neighborCount();
			const toKill = new Set(lonely(nc).concat(packed(nc)).map(c2s));
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
