import React from 'react'
import { Redirect } from 'react-router-dom'
import history from '../../history'

let logged = sessionStorage.getItem('logged')

export const logIn = (user_name, id_user) => {
    sessionStorage.setItem('logged',true)
    sessionStorage.setItem('user_name', user_name)
    sessionStorage.setItem('id_user', id_user)
    history.push('/admin/home')
}

export const validateLogin = () => {
    if(logged === 'true'){
        history.push('/admin/home')
    }else{
        history.push('/login')
    }
}

export const logOut = () => {
    sessionStorage.removeItem('logged')
    history.push('/login')
}