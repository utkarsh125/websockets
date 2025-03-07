import { createClient } from "redis";

const client = createClient();
async function startServer(){

    try {

        await client.connect();

        while(1){
           const response = await client.brPop("submission", 0)
           console.log(response);
           //Simulating an expensive application
           
           await new Promise((resolve) => setTimeout(resolve, 1000));

           //Send that to the pub/sub env
           console.log("Processed user's submission.");
        }


        
    } catch (error) {
        console.error("Error occurred: ", error);
    }
}

startServer();