const saluta = require('./utils')
const nomi = require('./nomi')
const express = require('express') //express
const app = express()//istanza di express
const os = require('os')
const {readFileSync, writeFileSync} = require('fs')


console.log("Benvenuto nel progetto di")
saluta (nomi.nome1, nomi.cognome1);

console.log("Prima di scoprire qualcosa di più sull'autore, ecco qualche informazione sul tuo dispositivo:")
console.log(os.userInfo(), os.uptime() )

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Accedi alla homepage attraverso il tuo browser, inserendo nella barra di ricerca il tuo localhost');
      }, 2000);
    });
}
  
  async function asyncCall() {
    console.log('Se il numero qui in alto è troppo alto, indica che il dispositivo è acceso da molto tempo, ricordati di fare una pausa. Se invece hai ancora tempo, scopri di più su di me.');
    const result = await resolveAfter2Seconds();
    console.log(result);
    // expected output: "resolved"
  }
  
  asyncCall();


app.use(express.static('public'))
app.listen(3000)

app.get('/', (req, res) => {
    res.sendFile('homepage.html', {root: __dirname + "/public"})
     })

app.get('/about', (req, res) => {
   const prova = readFileSync('./public/matricola.txt', 'utf8');
    res.writeHead(200, {"Content-Type": "text/html"}); 
    res.end('<p>Mi chiamo <strong>Sara Rabie</strong>! Ho 21 anni e vivo a Torino</p>' + prova);
  
       // res.sendFile('about.js', {root: __dirname + "/public" })
    })

    app.all('*', (req, res) => {
        res.sendFile('404.html',  {root: __dirname + "/public"})
    }) 
