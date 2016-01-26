
var allFiles = [];
var directoryFiles = [];

var counter = 0;

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
  // Logging out a message so I know when the data has been returned
  console.log("Data returned from Directory \n");
  directoryFiles = files;

  readMyFiles();
}

function readMyFiles(){

  console.log(directoryFiles.length);

  var currentFile = directoryFiles[counter];

  // Checking if the current filename is equal to this
  // file's name. If it is, then is doesn't get printed out
  // (Technically this is a cheat, will look at the api
  // to find a better way to test if it is the current file)
  if(currentFile !== "app.js");
  {
    // Logging out the contents of each file one at a time (using the counter to itterate)
    fs.readFile(currentFile, "utf8", function(err, result){
      // Creating a new object to store the information of this file temporarily
      var thisFile = {fName:"Placeholder File Name", contents:result, fNum:0};

      // Pushing this temporary object into the allFiles array
      allFiles.push(thisFile);
      counter++;

      if(counter == 1)
      {
        allFilesReturned();
      }else{
        readMyFiles();
      }
    });
  }
}

function allFilesReturned(){
  // If all of the files have been returned, log out the following message
  console.log("All files have been returned");
  //console.log(allFiles.length);
  for(var i=0; i< allFiles.length; i++)
  {
    console.log("The contents of " + allFiles[i].fName + " is " + allFiles[i].contents);
  }
}
