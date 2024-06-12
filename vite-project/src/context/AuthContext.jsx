import { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate  } from 'react-router-dom'
import axios from 'axios'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null )
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null )
    let [loading, setloading] = useState(true)


    const navigate = useNavigate ()

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: e.target.username.value,
                password: e.target.password.value,
            });
            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                navigate('/');
            } else {
                alert('Something went wrong!');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong!');
        }
    };

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    /* let updateToken = async () => {
        console.log('Update token called!');
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        });
        let data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            logoutUser();
        }

        if(loading){
            setloading(false)
        }
    }; */

    let contextData = {
        user:user,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,

    }

    useEffect(()=> {

        if(authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setloading(false)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}