

function* print() {
  while(true) {
    yield '-';
    yield '\\';
    yield '|';
    yield '/';
  }
}

const ascii = print();

setInterval(function() {
  //console.log('asd');
  console.clear()
  console.log(ascii.next().value)
}, 100)
