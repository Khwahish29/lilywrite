import pinataSDK from '@pinata/sdk';

const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } = process.env;

const pinata = new pinataSDK({pinataApiKey : '94b1a4bc9b055f5504d6', pinataSecretApiKey : '18af6519b24a2df50d3c7ce9c10f8ea51ccf01ba972adba74fc69897a832675d'});

export async function upload(prompt) {
    const json = {
        template : "You are a friendly chatbot assistant that responds conversationally to users' questions. \n Keep the answers short, unless specifically asked by the user to elaborate on something. \n \n Question: {question} \n \n Answer:",
        parameters : {
              "question": prompt
            }
        }
    const res = await pinata.pinJSONToIPFS(json);
    return res;
}