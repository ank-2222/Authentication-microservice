const accountSid = 'ACad4b830ec2db6fde3a6561b69608aff5';
const authToken = '596a98b3ace6525af3a388a120d76421';
const client = require('twilio')(accountSid, authToken);

export const sendWhatsappMessage = async(lat:string,long:string,phone:number,token:string)=>{

    console.log("whatsapp->",phone);

    client.messages
        .create({
            body: `Sending Emergency service to your location.\t Your current location\'s Latitude is ${lat} and longitude ${long}.\t Your Token = ${token}`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+91${phone}`
        })
        .then(() => console.log("whatsapp Message sent."));
      
}
