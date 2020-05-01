import history from '../../history'

export const logIn = (user_name, id_account, id_doctor, id_persona) => {
    localStorage.setItem('logged',true)
    localStorage.setItem('user_name', user_name)
    localStorage.setItem('id_doctor', id_doctor)
    localStorage.setItem('id_persona',id_persona)
    localStorage.setItem('id_account',id_account)
    history.push('/admin/home')
}

export const validateLogin = () => {
    let logged = localStorage.getItem('logged')

    return logged === 'true' ? null : history.push('/login')

}

export const logOut = () => {
    localStorage.removeItem('logged')
    
    localStorage.removeItem('id_doctor')
    localStorage.removeItem('id_persona')
    localStorage.removeItem('id_account')
    history.push('/login')
}