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
const UssdMenu = require('ussd-builder');
let menu = new UssdMenu();

// Define menu states
menu.startState({
    run: () => {
        // use menu.con() to send response without terminating session      
        menu.con('Welcome. Choose option:' +
            '\n1. Show Balance' +
            '\n2. Buy Airtime');
    },
    // next object links to next state based on user input
    next: {
        '1': 'showBalance',
        '2': 'buyAirtime'
    }
});

menu.state('showBalance', {
    run: () => {
        // fetch balance
        fetchBalance(menu.args.phoneNumber).then((bal)=>{
            // use menu.end() to send response and terminate session
            menu.end('Your balance is GHC ' + bal);
        });
    }
});

menu.state('buyAirtime', {
    run: () => {
        menu.con('Enter amount:');
    },
    next: {
        // using regex to match user input to next state
        '*\\d+': 'buyAirtime.amount'
    }
});

// nesting states
menu.state('buyAirtime.amount', {
    run: () => {
        // use menu.val to access user input value
        var amount = Number(menu.val);
        buyAirtime(menu.args.phoneNumber, amount).then((res)=>{
            menu.end('Airtime bought successfully.');
        });
    }
});

// AT
app.post('/ussd', async (req, res) => {
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
    // Read the variables sent via POST from our API
    // const {
    //     serviceCode,
    //     phoneNumber,
    //     text,
    // } = req.body;
    // let response = '';

    // console.log(`This is ${serviceCode} ${phoneNumber} ${text}`)
    // console.log(`body -> ${req.body.phoneNumber}`)
    // if (text === ""){
    //     response = 'CON we are in !'
    // }else if(text === "1"){
    //     response = 'CON were also in'
    // }
    // // console.log()
    // // console.log(`This is ${sessionId} ${serviceCode} ${phoneNumber} ${text}`)
    // // Send the response back to the API
    // res.set('Content-Type: text/plain');
    // res.send(response);

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