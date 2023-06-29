import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())

async function makeRequest(endpoint, type, payload, headers) {
    // switch between the type of request
    const BASEURL = "https://accounts.multitenant.slade360.co.ke/";

    await fetch(BASEURL + endpoint, {
      method: type,
      body: payload,
      headers: headers,
    })
      .then((response) => {
        return response.json();
      })
      .then((r) => setToken(r.access_token))
      .catch((error) => {
        console.log(error);
      });
  }

app.get('/', (req, res) => {
    res.send('Choo Choo! Welcome to your Express app 🚅');
})

app.get("/json", (req, res) => {
    res.json({"Choo Choo": "Welcome to your Express app 🚅"});
})

app.post('/ussd', async (req, res) => {
    // Read the variables sent via POST from our API
    const {
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    console.log(`This is ${serviceCode} ${phoneNumber} ${text}`)
    console.log(`body -> ${req.body}`)

    // console.log()
    let response = 'works';
    // console.log(`This is ${sessionId} ${serviceCode} ${phoneNumber} ${text}`)
    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

app.post('/slade', (req, res)=>{

    const {
        memberId,
        sladeId,
    } = req.body;

    console.log("tets - > ",memberId, sladeId)

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})