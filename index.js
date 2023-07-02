import express from 'express';
import cors from 'cors';
import axios from 'axios';
import catchAsync from './catchAsync.js';




const app = express();
app.use(express.json());
app.use(express.urlencoded())
app.use(cors())


app.options('*', cors())



app.get('/', (req, res) => {
  res.send('Choo Choo! Welcome to your Express app 🚅');
})

app.get("/json", (req, res) => {
  res.json({ "Choo Choo": "Welcome to your Express app 🚅" });
})

let benefits = '';
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

    

    if (text === '' || text === undefined || text === null) {
        // This is the first request. Note how we start the response with CON
        response = `CON Welcome to Tambuzi\nTo view your benefits \nSelect an insurance company:\n1. Jubilee Health Insurance Limited\n2. APA Insurance Company\n3. Madison General Insurance Kenya\n4. Britam General Insurance\n5. Minet Insurance Brokers Limited\n6. Savannah Informatics Insurance Scheme\n7. GNRSH Insurance Scheme`;
    } else if (text === '1') {
        // This is a second level response where the user selected 1 in the first instance
        response = `CON You selected option (Jubilee Health Insurance Limited)\nPlease reply with your member number:`;
    } else if (text === '2') {
        // This is a second level response where the user selected 2 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option(APA Insurance Company)\nPlease reply with your member number:`;
    } else if (text === '3') {
        // This is a second level response where the user selected 3 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Madison General Insurance Kenya)\nPlease reply with your member number:`;
    } else if (text === '4') {
        // This is a second level response where the user selected 4 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Britam General Insurance)\nPlease reply with your member number:`;
    } else if (text === '5') {
        // This is a second level response where the user selected 5 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Minet Insurance Brokers Limited)\nPlease reply with your member number:`;
    } else if (text === '6') {
        // This is a second level response where the user selected 6 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (Savannah Informatics Insurance Scheme)\nPlease reply with your member number:`;
    } else if (text === '7') {
        // This is a second level response where the user selected 7 in the first instance
        const selectedOption = text.split('*')[1];
        response = `CON You selected option ${selectedOption} (GNRSH Insurance Scheme)\nPlease reply with your member number:`;
    } else if (text.split('*').length == 2) {
        // This is a third level response where the user selected 1 in the first instance and provided the member number
       console.log({ text })
        const symptoms = text.split('*')
        response = `CON 1. You will incur charges to view your benefits Please enter your OTP`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(457, symptoms[1]);
    } else if (text.startsWith('2*1*')) {
        // This is a third level response where the user selected 2 in the first instance and provided the member number
        const symptoms = text.split('*')
        response = `CON 1. You will incur charges to view your benefits Please enter your OTP`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(2001, symptoms[1]);
    } else if (text.startsWith('3*1*')) {
         // This is a third level response where the user selected 2 in the first instance and provided the member number
        const symptoms = text.split('*')
        response = `CON 1. You will incur charges to view your benefits Please enter your OTP`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(2011, symptoms[1]);
    } else if (text.startsWith('4*1*')) {
         // This is a third level response where the user selected 2 in the first instance and provided the member number
        const symptoms = text.split('*')
        response = `CON 1. You will incur charges to view your benefits Please enter your OTP`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(2002, symptoms[1]);
    } else if (text.startsWith('5*1*')) {
        const symptoms = text.split('*')
        response = `CON 1. You will incur charges to view your benefits. Please enter your OTP`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(2020, symptoms[1]);
    } else if (text.startsWith('6*1*')) {
        const symptoms = text.split('*')
        response = `CON 1. You will incur charges to view your benefits. Please enter your OTP`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(2023, symptoms[1]);
    } else if (text.startsWith('7*1*')) {
        const symptoms = text.split('*')
        response = `CON 1. You will incur charges to view your benefits Please enter your OTP`;
        
        // Send selectedOption and memberNumber to the API
        sendToAPI(2022, symptoms[1]);
    } else if(text.split('*').length == 3){
      
      response = `END An SMS of your benefits will be received shortly`;
      fetch("https://expressjs-server-production-82a8.up.railway.app/send-sms")
      // main.js
      const formattedBenefits = benefits.benefits.map((benefit) => {
  const { benefitName, availableBalance, reservedAmount } = benefit;
  return `${benefitName}: Available Balance - ${availableBalance}, Reserved Amount - ${reservedAmount}`;});
      console.log(`${formattedBenefits[1]}\n${formattedBenefits[0]}`);
      
// POST request using fetch()
      fetch("https://expressjs-server-production-82a8.up.railway.app/send-sms", {
      	
      	// Adding method type
      	method: "POST",
      	
      	// Adding body or contents to send
      	body: JSON.stringify({
              "phone": "+254111643286",
              "message": `${formattedBenefits[1]}\n${formattedBenefits[0]}`
          }),
      	
      	// Adding headers to the request
      	headers: {
      		"Content-type": "application/json; charset=UTF-8"
      	}
      })
      
      // Converting to JSON
      .then(response => response.json())
      
      // Displaying results to console
      .then(json => console.log(json));

    }else {
      response = 'END Invalid input. Please try again.'
    };

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});
app.post("/test", async (req, res) => {
  const sendToAPI = catchAsync(async (selectedOption, memberNumber) => {
  console.log(memberNumber);
  const token = "d1nI1lyEfCO22T8x9zCyj2KKqMQuIg";
  const url = `https://provider-edi-api.multitenant.slade360.co.ke/v1/beneficiaries/member_eligibility/?member_number=${memberNumber}&payer_slade_code=${selectedOption}`;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data;
    console.log(data);
    // Process the data or handle the response as needed
    res.send(data);

  } catch (error) {
    console.log("Error: ", error);
    // Handle the error appropriately
  }
});
  
})
const getAccessToken = async () => {
  const url = "https://accounts.multitenant.slade360.co.ke/oauth2/token/";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const data = {
    "grant_type": "password",
    "client_id": "iWpyt68DcIZBEeYaCJwt4FxevogVa7Q6vSL2ierF",  // Substitute with your client_id,
    "client_secret": "o3GCGUuMOzeqlarx9KZDvj4r356JeM0LRukXmX4KdxEhCjKo17jPXQ1tYT66AnpNYPLddbSHMpSrNeizGj2yZGLcYpUxWxKotYzT3y2vPk9FDTzg1OHwxT5OKpxxbwi6", 
    "username": "austinndauwa@gmail.com",  // Your email.
    "password": "#djeijr4e",  // Your healthcloud account password.
  };

  try {
    
      return await axios.post(url, data, {headers});

  } catch (error) {
    console.log(error);
  }
};

const sendToAPI = catchAsync(async (selectedOption, memberNumber) => {
  const url = `https://provider-edi-api.multitenant.slade360.co.ke/v1/beneficiaries/member_eligibility/?member_number=${memberNumber}&payer_slade_code=${selectedOption}`;
  const token = await getAccessToken().then(async (Authresponse) => {
       
      const data = Authresponse.data;
      const access_token = data["access_token"];
      console.log("access_token : "+access_token);

   try {
    let response;
    if(access_token !== undefined){
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    }
    const data = response?.data;
  
           fetch("https://expressjs-server-production-82a8.up.railway.app/send-sms", {
      	
      	// Adding method type
      	method: "POST",
      	
      	// Adding body or contents to send
      	body: JSON.stringify({
              "phone": "+254111643286",
              "message": `Your Tambuzi OTP is 675749`
          }),
      	
      	// Adding headers to the request
      	headers: {
      		"Content-type": "application/json; charset=UTF-8"
      	}
      })
     benefits = data;
    
    // Process the data or handle the response as needed

  } catch (error) {
    console.log("Error: ", error);
    // Handle the error appropriately
  } 
  });
});





const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})