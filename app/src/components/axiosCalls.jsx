import axios from "axios";

export const uploadIPFS = async (prompt) => {
    const output = await axios.post('http://localhost:8080/upload', {
        prompt : prompt
    })
    .catch((err) => {
        console.log(err);
    })
    return output.data;
}