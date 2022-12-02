import { supabase } from "./supabaseClient"
import { Link } from "react-router-dom"

const { Fragment } = require("react")

const Header = (() => {
    return (
        <Fragment>
            <div className="header-container">
                <Link className="nav-home" to="/">Home</Link>
                <div className="signOut-div"
                    onClick={() => {
                        supabase.auth.signOut()
                    }}
                >Sign Out</div>
            </div>
        </Fragment>
    )
})

export default Header