import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8080/api/'
})
  
export default {
    get( url ){
        return axios.get( url )
    },

    show( url ){
        return axios.get( url + id );
    },

    update( url, id, data ){
        return axios.put( url + id, data );
    },

    create( url, data ){
        return axios.post(url , data );
    },

    delete( url, id ){
        return axios.delete( url  + id )
    }
}