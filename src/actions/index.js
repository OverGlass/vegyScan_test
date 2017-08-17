import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, PROTECTED_TEST, RANDOM_VEGIES, EVAL_VEGY, INFO_VEGY} from './types';

// URL API VEGYSCAN | © Julien Wzsolek
const ROUTE_URL = 'https://api.vegyscan.fr';

// -----------------------
// (--- AUTHENTIFCATION---)
// -----------------------


//set AXIOS HEADER

export function setTokenHeader(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// ERROR HANDLER

export function errorHandler(dispatch, error, type){
    console.log('erreur',error)
    let errorMessage;
    if(error){
        errorMessage = error.data.error ? error.data.error : error.data.message;
    } else {
        errorMessage = 'coucou'
    }

    if(error.status === 401){
        dispatch({
            type : type,
            payload : UNAUTH_USER
        });
        logoutUser(dispatch);
    } else {
        dispatch({
            type: type,
            payload : errorMessage
        })
    }
}


export function loginUser(username, password){
    return (dispatch) => {
        const url = `${ROUTE_URL}/api/token`;
        const urlUser = `${ROUTE_URL}/users/`;
        axios.post(url, {username, password})
        .then(res => {
            const userIds = {
                idUser : res.data.id,
                idEtablissement : res.data.etablissement,
                idRole : res.data.roles
            }
            AsyncStorage.multiSet([
                ['userIds',  JSON.stringify(userIds)],
                ['token', JSON.stringify(res.data.token)]
            ]);
            setTokenHeader(res.data.token);

            //On récupère les infos user
            axios.get(urlUser + res.data.id)
            .then(res => {
                const userInfo = {
                    lastName : res.data.nom,
                    firstName : res.data.prenom
                }

                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                dispatch({ type: AUTH_USER});
                dispatch({ type : 'USER_DATA', payload : userInfo})

            })
            // .catch(err => {
            //     errorHandler(dispatch, err.response, 'ERROR_INFO')
            // })
        })
        // .catch(error => {
        //     errorHandler(dispatch, error.response, AUTH_ERROR);
        // })
    }
}

export function checkAuth(){
     const url = `${ROUTE_URL}/users/1`;
    return (dispatch) => { 
     AsyncStorage.getItem('token')
         .then(token => {
             axios.get(url, {
                  headers: {
                    'Authorization': 'Bearer ' + JSON.parse(token)
                  }
             })
                 .then(res => {
                     setTokenHeader(JSON.parse(token));
                     dispatch({ type: PROTECTED_TEST })
                 })
                //  .catch(error => {
                //      errorHandler(dispatch, error.response, UNAUTH_USER)
                //  })
                
         })
        //  .catch( error => {
        //      errorHandler(dispatch, error.response, UNAUTH_USER)
        //  })
     }
}


export function logoutUser() {  
  return (dispatch) => {
    dispatch({ type: UNAUTH_USER });
    AsyncStorage.clear();
  }
}


// -----------------------
// (--- VEGIES HANDLING---)
// -----------------------


export function getRandomVegies() {
    return (dispatch) => {
        const url = `${ROUTE_URL}/vegetaux-random/`;
        AsyncStorage.getItem('userIds').then(res => {
            const info = JSON.parse(res);
            axios.get(url + info.idEtablissement + '/5')
            .then(res => {
                dispatch({type:RANDOM_VEGIES, payload:res.data})
            })
            .catch(err => {
                console.log('test', err.response)
                errorHandler(dispatch, err.response, UNAUTH_USER)
            })
        })

    }
}


// -----------------------
// (--- SCAN HANDLING ---)
// ----------------------

export function vegyFetch(link, user, etablissement){
    console.log('VEGY_FETCH')
    var link = link.split('/');
    var verif = link[0] + '//' + link[2];
    var id = link[4];
    var domain = "https://scan.vegyscan.fr";

    if (domain === verif && id) {
            console.log('VEGY_FETCH_OK',id)
        const url = `${ROUTE_URL}/api/vegetaux/`;
        return (dispatch) => {
            AsyncStorage.getItem('userIds').then(res => {
                const info = JSON.parse(res);
                axios.get(url + info.idEtablissement +'/'+ id +'/'+ info.idUser )
                    .then(res => {
                        if (res.data[0].fields) {
                            dispatch({ type: EVAL_VEGY, payload: res.data })
                        } else {
                            dispatch({ type: INFO_VEGY, payload: res.data })
                        }
                    })
                    .catch(err => {
                        console.log('test', err.response)
                        errorHandler(dispatch, err.response, UNAUTH_USER)
                    })
            })
        }
    }
}

