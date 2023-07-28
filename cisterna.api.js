import axios from 'axios';
export  const createEvent = async(pkg)=>{
    return await axios.post("http://44.207.54.43:4000/api/cisterna", pkg);
}