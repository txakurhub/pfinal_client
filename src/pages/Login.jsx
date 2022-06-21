function Login() {
    return (
        <div>
            <form action="">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Breezeicons-actions-22-im-user.svg" alt="Login" width="30px" height="30px"/>
                <br />
                <label>Email</label>
                <br />
                <input type="text" placeholder="Email"/>
                <br />
                <label>Password</label>
                <br />
                <input type="text" placeholder="Password"/>
                <br />
                <ul>
                    <li>
                        <a href="">
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa-brands fa-google"></i>
                        </a>
                    </li>
                </ul>
                <br />
                <a href="">Olvide mi contraseña</a>
            </form>
        </div>
    )
}

export default Login;
