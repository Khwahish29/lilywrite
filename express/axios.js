import axios from "axios";

export const getContent = async (cid) => {
    const output = await axios.get(`https://turquoise-genetic-pony-29.mypinata.cloud/ipfs/${cid}/stdout`, {
        headers : {
            'x-pinata-gateway-token' : '2WERdGeyBpm2UpEAf7qpJfS409vmi0tsnrEFkaeKW-_UFGVLBXWl4twD_9oZZTPF'
        }
    });
    return output.data;
}