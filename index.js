import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(express.urlencoded())
app.use(cors())

async function makeRequest(endpoint, type, payload, headers) {
    // switch between the type of request
    const BASEURL = "https://accounts.multitenant.slade360.co.ke/";

    respo = await fetch(BASEURL + endpoint, {
        method: type,
        body: payload,
        headers: headers,
    })

    return respo
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

app.post('/slade', async (req, res) => {

    const {
        memberId,
        sladeId,
    } = req.body;
    
    const string =
    "grant_type=password&client_id=XdIjJgLQBOt8GCAti5GE9413y5BsR2V2IzybSj5q&client_secret=kC0N0LHwYjvv60QmsWMiPv7J7ZZoSHsb7cdLf9pgsmxInGXcBWj3Gw6KKAU9GRqO6JKpiO4y9pSwybo9SSH3chdq31jYU4V0NEhDIztGfiYgeSOG2NJorWl2ENDG0y8f&username=angelmuttai@gmail.com&password=A1997Gaa!";

    d = await makeRequest("oauth2/token/", "POST", string, {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
    });    

    if(memberId && sladeId && d ){

        const url = `https://provider-edi-api.multitenant.slade360.co.ke/v1/beneficiaries/member_eligibility/?member_number=${memberId}&payer_slade_code=${sladeId}`;

        const headers = {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };

        fetch(url, {method:"GET", headers })
        .then((resppp)=>{
            return resppp.json();
        })
        .then((data)=>{
            res(data)
        })
    }else{
        res.status(400)
        res.json("Failed, missing params")
    }

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})