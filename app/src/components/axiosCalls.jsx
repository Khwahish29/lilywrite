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

export const getContent = async (cid) => {
    const output = await axios.get(`http://localhost:8080/fetch/${cid}/`);
    let parts = output.data.split('}}');
    let test = parts[1].split('<pad> ');
    let answer = test[1].slice(0, test[1].length - 3);

    let ques = test[0].split(',');
    let question = ques[0].split(': ');
    return([answer, question[1]]);
}