// Requiring the File System module
var fs = require("fs");

// Using the File System module to read the current
// directory I am in, and calling the filesReturned callback
// once they get returned
fs.readdir("./", filesReturned);

// Creating the callback function for the readdir() request above
// which takes in two parametres - any errors, and the files or
// result returned
function filesReturned(err, files){
  // Logging out a message so I know when the files have been returned
  console.log("Files returned from Directory");

  // Looping through each file in the result
  for(f in files)
  {
    // Checking if the current filename is equal to this
    // file's name. If it is, then is doesn't get printed out
    // (Technically this is a cheat, will look at the api
    // to find a better way to test if it is the current file)
    if(files[f] !== "app.js")
    {
      // Logging out the file name for each file
      console.log(files[f]);
    }
  }

}
