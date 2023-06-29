import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Choo Choo! Welcome to your Express app 🚅');
})

app.get("/json", (req, res) => {
    res.json({"Choo Choo": "Welcome to your Express app 🚅"});
})

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;

    let response = 'works';

    console.log(`This is ${sessionId} ${serviceCode} ${phoneNumber} ${text}`)

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

app.post('/slade', (req, res)=>{

    const {
        memberId,
        sladeId,
    } = req.body;

    console.log()

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})