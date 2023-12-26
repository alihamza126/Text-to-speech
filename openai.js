const express = require('express');
const app = express();
const path = require('path');
const fs =require('fs')
const OpenAI =require('openai')



app.use(express.static('public'));
var filepath = path.join(__dirname, 'voice.wav');
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))


app.listen(3000, () => {
    console.log("it work's properly");
});

app.get('/', (req, res) => {
    res.render('index.ejs', { filepath });
})

app.get('/speech', (req, res) => {
    
})

// =============




const openai = new OpenAI({apiKey:'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'});

const speechFile = path.resolve("./speech.mp3");

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
main();
