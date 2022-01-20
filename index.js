// generate express app
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const app = express();



// Parse URL-encoded bodies / // Parse JSON bodies
// app.use(express.urlencoded());
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// set view engine
app.set('view engine', 'pug')


// generate Routes
// [get] Routes
app.get("/", (request, response) => {

    // dynamic rendering
    response.render('index', { output: ''})

})
// [post Routes]
app.post("/", function(request,response) {    
    // set status of reponse - post work
  

    // log form data
    console.log(request.body.name);

    // generate html to show
    var output = getNameTemplate(request.body.name);

    // update page to display
    // response.render('index', { output: ''}) - cannot set new headers on reply
    //document.getElementsByName("output").innerHTML = output; - not standard JS

    response.send(output);
})


// configure express hosting
const port = process.env.port || 4000;

// enable listener
app.listen(port, () => {
    console.log("listening to port " + port)
});





// Processing functions

// generate html template for output
var getNameTemplate = function(pName) {

    var compiledFunction = pug.compileFile('views\\name_res.pug');
    var output = compiledFunction({
        name: pName
      })

    return output;
};