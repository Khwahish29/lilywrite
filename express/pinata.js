import pinataSDK from '@pinata/sdk';

const { PINATA_API_KEY, PINATA_API_SECRET, PINATA_JWT } = process.env;

const pinata = new pinataSDK({pinataApiKey : '94b1a4bc9b055f5504d6', pinataSecretApiKey : '18af6519b24a2df50d3c7ce9c10f8ea51ccf01ba972adba74fc69897a832675d'});

export async function upload(prompt) {
    const json = {
        template : "You are a poetic chatbot, crafting insightful four-line poems in response to inquiries. \n Each response should be a unique, non-repetitive, and meticulously chosen amalgamation of words, diving deep into the essence of the question. \n\n Question: {question} \n\n Answer:",
        parameters : {
              "question": prompt
            }
        }
    const res = await pinata.pinJSONToIPFS(json);
    return res;
}