import React, { Component } from 'react';
import LoginFormButton from './LoginFormButton';
import './LoginForm.css';
import '../../assets/css/loginError.css';
import cn from 'classnames';
import { observer, inject } from 'mobx-react';
import LoginSuccesful from '../LoginSuccessful';


export class Test extends Component {
    static displayName = Test.name;

    constructor(props) {
        super(props);
       this.displayName = this.constructor.name;
        this.apiAddress = 'https://localhost:44321/api/foods';
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this)
    }

    onLoginChange(e) {
        this.props.LoginFormStore.loginChange(e.target.value)
    }
    onPasswordChange(e) {
        this.props.LoginFormStore.passwordChange(e.target.value)
    }
    render() {
        if (this.props.LoginFormStore.loginStatus === true) {
            return (
                <LoginSuccesful />
            )
        }
        else {
            return (
                <div className="LoginForm_container">
                    <h1 className="LoginForm_title">Login</h1>
                    <input type="text" onChange={this.onLoginChange} className={cn('LoginForm__input', (this.props.LoginFormStore.loginStatus === false) ? 'loginError' : '')} placeholder="Login" />
                    <input type="password" onChange={this.onPasswordChange} className="LoginForm__input" placeholder="Password" />
                    <LoginFormButton />
                </div>
            )
        }
    }
}

export default Test


  