import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(express.urlencoded())
app.use(cors())

let test = ""
async function makeRequest(endpoint, type, payload, headers) {
    // switch between the type of request
    const BASEURL = "https://accounts.multitenant.slade360.co.ke/";
    try {
        await fetch(BASEURL + endpoint, {
            method: type,
            body: payload,
            headers: headers,
        })
            .then(data => {
                return data.json()
            })
            .then((d) => {
                console.log("data", d)
                test = d
                return test
            })
    } catch (error) {
        return null
    }
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
    } else if (text.startsWith('1*')) {
        // This is a second level response where the user selected 1 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Jubilee Health Insurance Limited)\nPlease reply with your member number:`;
    } else if (text.startsWith('2*')) {
        // This is a second level response where the user selected 2 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (APA Insurance Company)\nPlease reply with your member number:`;
    } else if (text.startsWith('3*')) {
        // This is a second level response where the user selected 3 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Madison General Insurance Kenya)\nPlease reply with your member number:`;
    } else if (text.startsWith('4*')) {
        // This is a second level response where the user selected 4 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Britam General Insurance)\nPlease reply with your member number:`;
    } else if (text.startsWith('5*')) {
        // This is a second level response where the user selected 5 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Minet Insurance Brokers Limited)\nPlease reply with your member number:`;
    } else if (text.startsWith('6*')) {
        // This is a second level response where the user selected 6 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Savannah Informatics Insurance Scheme)\nPlease reply with your member number:`;
    } else if (text.startsWith('7*')) {
        // This is a second level response where the user selected 7 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (GNRSH Insurance Scheme)\nPlease reply with your member number:`;
    } else if (text.startsWith('1*1*')) {
        // This is a third level response where the user selected 1 in the first instance and provided the member number
        const selectedOption = text.split('*')[1];
        const memberNumber = text.split('*')[2];
        response = `END You selected option ${selectedOption} (Jubilee Health Insurance Limited) with member number ${memberNumber}. Thank you!`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(selectedOption, memberNumber);
    } else if (text.startsWith('2*1*')) {
        // This is a third level response where the user selected 2 in the first instance and provided the member number
        const selectedOption = text.split('*')[1];
        const memberNumber = text.split('*')[2];
        response = `END You selected option ${selectedOption} (APA Insurance Company) with member number ${memberNumber}. Thank you!`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(selectedOption, memberNumber);
    } else if (text.startsWith('3*1*')) {
        // This is a third level response where the user selected 3 in the first instance and provided the member number
        const selectedOption = text.split('*')[1];
        const memberNumber = text.split('*')[2];
        response = `END You selected option ${selectedOption} (Madison General Insurance Kenya) with member number ${memberNumber}. Thank you!`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(selectedOption, memberNumber);
    } else if (text.startsWith('4*1*')) {
        // This is a third level response where the user selected 4 in the first instance and provided the member number
        const selectedOption = text.split('*')[1];
        const memberNumber = text.split('*')[2];
        response = `END You selected option ${selectedOption} (Britam General Insurance) with member number ${memberNumber}. Thank you!`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(selectedOption, memberNumber);
    } else if (text.startsWith('5*1*')) {
        // This is a third level response where the user selected 5 in the first instance and provided the member number
        const selectedOption = text.split('*')[1];
        const memberNumber = text.split('*')[2];
        response = `END You selected option ${selectedOption} (Minet Insurance Brokers Limited) with member number ${memberNumber}. Thank you!`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(selectedOption, memberNumber);
    } else if (text.startsWith('6*1*')) {
        // This is a third level response where the user selected 6 in the first instance and provided the member number
        const selectedOption = text.split('*')[1];
        const memberNumber = text.split('*')[2];
        response = `END You selected option ${selectedOption} (Savannah Informatics Insurance Scheme) with member number ${memberNumber}. Thank you!`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(selectedOption, memberNumber);
    } else if (text.startsWith('7*1*')) {
        // This is a third level response where the user selected 7 in the first instance and provided the member number
        const selectedOption = text.split('*')[1];
        const memberNumber = text.split('*')[2];
        response = `END You selected option ${selectedOption} (GNRSH Insurance Scheme) with member number ${memberNumber}. Thank you!`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(selectedOption, memberNumber);
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});
// const BASEURL1 = "https://accounts.multitenant.slade360.co.ke/";
// const PROVIDERAPIURL = "https://provider-edi-api.multitenant.slade360.co.ke/v1/beneficiaries/member_eligibility/";

// async function Request(endpoint, type, payload, headers) {
//   try {
//     const response = await fetch(BASEURL1 + endpoint, {
//       method: type,
//       body: payload,
//       headers: headers,
//     });

//     const data = await response.json();
//     return data.access_token;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// // Function to send selectedOption and memberNumber to the API
// async function sendToAPI(selectedOption, memberNumber) {
//   const string =
//     "grant_type=password&client_id=XdIjJgLQBOt8GCAti5GE9413y5BsR2V2IzybSj5q&client_secret=kC0N0LHwYjvv60QmsWMiPv7J7ZZoSHsb7cdLf9pgsmxInGXcBWj3Gw6KKAU9GRqO6JKpiO4y9pSwybo9SSH3chdq31jYU4V0NEhDIztGfiYgeSOG2NJorWl2ENDG0y8f&username=angelmuttai@gmail.com&password=A1997Gaa!";

//   try {
//     const token = await Request("oauth2/token/", "POST", string, {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Accept: "application/json",
//     });

//     const url = `${PROVIDERAPIURL}member_number=${memberNumber}&payer_slade_code=${selectedOption}`;

//     const headers = {
//       Accept: "*/*",
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     };

//     const response = await fetch(url, { method: "GET", headers });
//     const data = await response.json();

//     console.log(data)

    
//   } catch (error) {
//     console.log(error);
//     // Handle error if needed
//   }
// }


app.post('/slade', async (req, res) => {

    const {
        memberId,
        sladeId,
    } = req.body;

    const string =
        "grant_type=password&client_id=XdIjJgLQBOt8GCAti5GE9413y5BsR2V2IzybSj5q&client_secret=kC0N0LHwYjvv60QmsWMiPv7J7ZZoSHsb7cdLf9pgsmxInGXcBWj3Gw6KKAU9GRqO6JKpiO4y9pSwybo9SSH3chdq31jYU4V0NEhDIztGfiYgeSOG2NJorWl2ENDG0y8f&username=angelmuttai@gmail.com&password=A1997Gaa!";

    // const mydata = makeRequest("oauth2/token/", "POST", string, {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Accept: "application/json",
    // })
    // console.log("working", mydata)
    test = "z2zXuKnQ6SJgUq4DNX0Z2rlIDbXTAT"
    if (memberId && sladeId) {
        try {
            const url = `https://provider-edi-api.multitenant.slade360.co.ke/v1/beneficiaries/member_eligibility/?member_number=${memberId}&payer_slade_code=${sladeId}`;

            const headers = {
                Accept: "*/*",
                Authorization: `Bearer ${test}`,
                "Content-Type": "application/json",
            };

            const data = await axios.get(url, headers)
             .then((response)=>{
                console.log(response)
                return response
             })

             res.status(200).json(data)

            // await fetch(url, { method: "GET", headers })
            //     .then(data => {
            //         console.log("api res", data)
            //         res.send(data)
            //     })
        } catch (error) {
            res.status(400)
        }
    } else {
        res.status(400)
        res.json("Failed, missing params")
    }

})



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})