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

    return await fetch(BASEURL + endpoint, {
        method: type,
        body: payload,
        headers: headers,
    })
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

    console.log(`Testing ${phoneNumber} ${serviceCode}`);

    if (text === '') {
        // This is the first request. Note how we start the response with CON
        response = `CON Welcome to MyInsurance\nSelect an insurance company:\n1. Jubilee Health Insurance Limited\n2. APA Insurance Company\n3. Madison General Insurance Kenya\n4. Britam General Insurance\n5. Minet Insurance Brokers Limited\n6. Savannah Informatics Insurance Scheme\n7. GNRSH Insurance Scheme`;
    } else if (text === '1') {
        // Business logic for first level response
        response = `CON You selected Jubilee Health Insurance Limited (Code: 457)\nPlease reply with your account number:`;
    } else if (text === '2') {
        // Business logic for first level response
        response = `CON You selected APA Insurance Company (Code: 2001)\nPlease reply with your account number:`;
    } else if (text === '3') {
        // Business logic for first level response
        response = `CON You selected Madison General Insurance Kenya (Code: 2011)\nPlease reply with your account number:`;
    } else if (text === '4') {
        // Business logic for first level response
        response = `CON You selected Britam General Insurance (Code: 2002)\nPlease reply with your account number:`;
    } else if (text === '5') {
        // Business logic for first level response
        response = `CON You selected Minet Insurance Brokers Limited (Code: 2020)\nPlease reply with your account number:`;
    } else if (text === '6') {
        // Business logic for first level response
        response = `CON You selected Savannah Informatics Insurance Scheme (Code: 2023)\nPlease reply with your account number:`;
    } else if (text === '7') {
        // Business logic for first level response
        response = `CON You selected GNRSH Insurance Scheme (Code: 2022)\nPlease reply with your account number:`;
    } else if (text.startsWith('1*')) {
        // This is a second level response where the user selected 1 in the first instance
        const selectedOption = text.split('*')[1];
        response = `END You selected option ${selectedOption}. Thank you!`;
    } else if (text.startsWith('2*')) {
        // This is a second level response where the user selected 2 in the first instance
        const selectedOption = text.split('*')[1];
        response = `END You selected option ${selectedOption}. Thank you!`;
    } else if (text.startsWith('3*')) {
        // This is a second level response where the user selected 3 in the first instance
        const selectedOption = text.split('*')[1];
        response = `END You selected option ${selectedOption}. Thank you!`;
    } else if (text.startsWith('4*')) {
        // This is a second level response where the user selected 4 in the first instance
        const selectedOption = text.split('*')[1];
        response = `END You selected option ${selectedOption}. Thank you!`;
    } else if (text.startsWith('5*')) {
        // This is a second level response where the user selected 5 in the first instance
        const selectedOption = text.split('*')[1];
        response = `END You selected option ${selectedOption}. Thank you!`;
    } else if (text.startsWith('6*')) {
        // This is a second level response where the user selected 6 in the first instance
        const selectedOption = text.split('*')[1];
        response = `END You selected option ${selectedOption}. Thank you!`;
    } else if (text.startsWith('7*')) {
        // This is a second level response where the user selected 7 in the first instance
        const selectedOption = text.split('*')[1];
        response = `END You selected option ${selectedOption}. Thank you!`;
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

    await makeRequest("oauth2/token/", "POST", string, {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
    }).then((d)=>{
        if(memberId && sladeId && d ){

            const url = `https://provider-edi-api.multitenant.slade360.co.ke/v1/beneficiaries/member_eligibility/?member_number=${memberId}&payer_slade_code=${sladeId}`;
    
            const headers = {
                Accept: "*/*",
                Authorization: `Bearer ${d.access_token}`,
                "Content-Type": "application/json",
              };
    
            fetch(url, {method:"GET", headers })
            .then((data)=>{
                console.log(data)
                res.json(data)
            })
        }else{
            res.status(400)
            res.json("Failed, missing params")
        }
    })    

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})