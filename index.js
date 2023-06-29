import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded())
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
    res.json({ "Choo Choo": "Welcome to your Express app 🚅" });
})

// AT
app.post('/ussd', async (req, res) => {
    // Read the variables sent via POST from our API

    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = '';

    console.log(`Testing ${phoneNumber} ${serviceCode}`)

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON What would you like to check ?
            1. My account balance
            2. My benefits`;
    } else if (text == '1') {
        // Business logic for first level response
        response = `Please reply with your acccount number`;
    } else if (text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        response = `END Your phone number is ${phoneNumber}`;
    } else if (text == '1*1') {
        // This is a second level response where the user selected 1 in the first instance
        const accountNumber = 'ACC100101';
        // This is a terminal request. Note how we start the response with END
        response = `END Your account number is ${accountNumber}`;
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

app.post('/slade', (req, res) => {

    const {
        memberId,
        sladeId,
    } = req.body;

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})