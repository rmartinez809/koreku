import { supabase } from "./supabaseClient"
import { Link, useNavigate } from "react-router-dom"

const { Fragment } = require("react")

const Header = (() => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="header-container">
                <Link className="nav-home" to="/">Home</Link>
                <div className="signOut-div"
                    onClick={() => {
                        navigate('/')
                        supabase.auth.signOut()
                    }}
                >Sign Out</div>
            </div>
        </Fragment>
    )
})

export default Header