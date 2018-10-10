const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0; // global counter variable has val 0

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

// function that takes in a parameter "num" which is presumably a number
const zeroPaddedNumber = (num) => { 
  // return a thing that is presumably a zero-padded version of that number
  
  // Expectation: 
  // num = 100 => 00100
  // num = 5 => 00005
  // num = 0 => 00000 
  // num 100000000 => 100000000
  console.log('zeroPaddedNumber has been invoked!');
  return sprintf('%05d', num); 
};

// function that takes in an argument for the parameter "callback", which
// presumably is a callback function.
// Overall effect: gets the value of the file containing the last id created. (e.g. '00001')
const readCounter = (callback) => {
  console.log('readCounter invoked!');

  // invoke fs.readFile() passing in some property of exports, anda callback function
  // the value of exports.counterFile is some unknown value that we'll grab from a file we'll create later... ?
  // the callback is an error-first request handler?
  fs.readFile(exports.counterFile, (err, fileData) => {
    // if there's an error
    console.log('readFile was invoked!');
    if (err) {
      // pass null in for 'err' and 0 in for 'fileData'
      console.log('readFile threw an error!');
      callback(null, 0);
    // if there isn't an error
    } else {
      console.log('readFile fileData ====', fileData);
      console.log('readFile is passing in ', Number(fileData));
      // pass null in for 'err' and new number of whatever the value of 'fileData' is that got passed in.
      // (?) fs.readFile will pass a value from exports.counterFile into both err and fileData.
      callback(null, Number(fileData));
    }
  });
};

// function that takes in an argument for the parameter 'count' and an argument for the parameter 'callback'
// I'd guess that count is going to be a number from some counter variable
// I think that callback is going to be a callback function.
// Overall effect: Creates a new file whose contents are the same as the last file created plus 1.
const writeCounter = (count, callback) => {

  // instantiate a new variable called counterString.
  // the value is what is returned by zeroPaddedNumber() when you pass in the value of the count parameter.
  console.log('writeCounter has been invoked!');
  var counterString = zeroPaddedNumber(count);
  console.log('before writeFile counterString ===', counterString);
  // invoke fs.writeFile, passing in exports.counterFile, which is presumably a count, and counterString, which
  // is the zero-padded, string form of the count, and a callback function, which looks like an error handler
  fs.writeFile(exports.counterFile, counterString, (err) => {

    // if there's an error
    console.log('writeCounter Error === ', err);
    console.log('writeCounter counterString === ', counterString);

    if (err) {
      // throw this message
      throw ('error writing counter');

    // if there's no error
    } else {
      // invoke the callback function, passing in null for 'err' and counterString for... 'data' ?
      callback(null, counterString);
    }
  });
};

// let fs.writeFile = (filePath, id, callback) {
  // do stuff
//}

// Public API - Fix this function //////////////////////////////////////////////

// Inputs: current state of the counter
// Outputs: none?
// Constraints: none?
// Edge Cases: errors?

// strategy: Make use of readCounter and writeCounter functions.

// write pseudocode for the readCounter and writeCounter functions
// to check our understanding √

// come up with how they factor into the refactor of getNextUniqueId.

// How would the above functions help us refactor what the function below does?
  
//



// a function that takes no arguments
exports.getNextUniqueId = (callback) => {
  // reassign the global counter variable to have a value of itself plus one.
  var incrementCounter = (err, fileData) => {
    console.log('incrementCounter invoked!');
    counter = fileData + 1;
    writeCounter(counter, callback);
  };
  readCounter(incrementCounter);
};


// __dirname tells you what folder 'counter.txt' is in
// it traverses the file system looking for that file, and concatonates
// the contents to a string.
// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt'); // => 'hrsf105-cruddy-todo/datastore/' + 'counter.txt'
