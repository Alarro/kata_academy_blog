import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classes from './Header.module.scss'

import ProfilePic from "../../img/ProfilePic.png"

import { logOut, cleanArticle } from "../../Services/Services";

function Header ({ state, logOut, cleanArticle }) {
    if (state.ProfilePic) {
        ProfilePic = state.image;
    }

    if (state.loggedIn) {
        return (
            <header className={classes.header}>
                <div className={classes.header__leftItems}>
                    <Link to='/articles' className={classes.leftItems__mainPage} onClick={cleanArticle}>
                        Realworld Blog
                    </Link>
                </div>
                <div className={classes.header__rightItems}>
                    <Link to='/new-article/' className={classes.createArticle}>
                        Create Article
                    </Link>
                    <Link to='/profile/' className={classes.ProfileInfo}>
                        {state.username}
                        <img className={classes.ProfilePic} src={ProfilePic} alt="profile picture"/>
                    </Link>
                    <button onClick={logOut} className={classes.logOut}>
                        Log Out
                    </button>
                </div>
            </header>
        )
    }

    if (!state.loggedIn) {
        return (
            <header className={classes.header}>
                <div className={classes.header__leftItems}>
                    <Link to='/articles' className={classes.leftItems__mainPage} onClick={cleanArticle}>
                        Realworld Blog
                    </Link>
                </div>
                <div className={classes.header__rightItems}>
                    <Link to='/sign-in/' className={classes.signIn}>
                        Sign In
                    </Link>
                    <Link to='/sign-up/' className={classes.signUp}>
                        Sign Up
                    </Link>
                </div>
            </header>
        )
    }
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	logOut: () => dispatch(logOut()),
	cleanArticle: () => dispatch(cleanArticle())
});

export default connect(mapStateProps, mapDispatchToProps)(Header);