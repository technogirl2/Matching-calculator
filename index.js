// HINTS:
// 1. Import express and axios
import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;




// 3. Use the public folder for static files.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// 4. When the user goes to the home page it should render the index.ejs file.

app.get('/', (req, res) => {
    res.render('index.ejs');


});
app.post('/submit', async(req, res) =>{
    try{
        const options = {
            method: 'GET',
            url: 'https://love-calculator.p.rapidapi.com/getPercentage',
            params: {
              sname: req.body.sname,
              fname: req.body.fname
            },
            headers: {
              'X-RapidAPI-Key': '484c3f4311msh80e9a7b665aea14p1be1b1jsnbe675392d242',
              'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              res.render('index.ejs', {loveScore: response.data.percentage, result: response.data.result})
          } catch (error) {
              console.error(error);
          }
    

    }catch(error){
        console.log(error.response.data);
        res.status(500);
    }
   
});

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.


// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log('listen on port');

});
