import { COMPANY_NAME } from './conts/CONTS';


function Login () {

    return (
        <div>
            <h1>Login de {COMPANY_NAME}</h1>
        <form>
            <div>
                <label htmlFor="username">Username: </label>
                <input type="text" id='username' name='username'/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" />
            </div>
            <button type='submit'>Login</button>
        </form>
        </div>
        
    )
}


export default Login;