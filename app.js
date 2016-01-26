// Requiring the File System module
var fs = require("fs");

// Using the File System module to read the current
// directory I am in, and calling the filesReturned callback
// once they get returned
fs.readdir("./", filesReturned);

function filesReturned(err, files){
  console.log("Files returned from Directory");

  for(f in files)
  {
    console.log(files[f]);
  }

}
