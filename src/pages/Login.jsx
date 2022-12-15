import React, { useState } from 'react'
import instanceAPI from '../api/instance'
import { fetchAuth } from '../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom/dist'

function Login() {
    const [email, setEmail] = useState("gracemckenna26@gmail.com")
    const [password, setPassword] = useState("mckennagrace26")
    const isAuth = useSelector(state => state.auth.isAuth)
    const dispatch = useDispatch()
    const onLogin = async (e) => {
        e.preventDefault()
        const fetchedData = await dispatch(fetchAuth({ email, password }))
        localStorage.setItem('token', fetchedData.payload.access)
    }


    if (isAuth) {
        return <Navigate to="/projects" />
    }


    return (
        <div className='login__wrapper'>
            <div className="login">
                <div className="login__logo">Customary</div>
                <form action="submit" onSubmit={onLogin} className="login__form">
                    <p className="login__title">Sign In to Customary</p>
                    <div className="login__field">
                        <label htmlFor="email" className="login__label">Email:</label>
                        <input placeholder='Email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="login__input" />
                    </div>
                    <div className="login__field">
                        <label htmlFor="password" className="login__label">Password:</label>
                        <input placeholder='Password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="login__input" />
                    </div>
                    <input type="submit" className='login__submit' value="Continue" />
                </form>
            </div>
        </div>
    )
}

export default Login