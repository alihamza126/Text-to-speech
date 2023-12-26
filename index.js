const express = require('express');
const app = express();
const path = require('path');
const gtts = require('node-gtts')('en');
const fs = require('fs');


app.use(express.static("public"));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); //for json request
app.use(express.urlencoded({ extended: true }))



app.listen(3000, () => {
    console.log("it work's properly");
});

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/speech', (req, res) => {
    let voice = Date.now();
    let filepath = path.join(__dirname, `/public/${voice}.wav`);
    voice = `/${voice}.wav`;
    gtts.save(filepath, req.query.text, (e) => {
        res.render('new', { voice });
    });
    
     fs.unlink(filepath, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Successfully deleted the file.")
        }
    })
})