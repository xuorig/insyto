import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import globalStyles from '../Shared/GlobalStyles.css';
import styles from './LoginPage.css';
import Button from '../Shared/Buttons/Button';
import SubmitButton from '../Shared/Buttons/SubmitButton';
import request from 'superagent';
import Constants from '../../constants/Constants';

class LoginPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        message: null
      };
  }

  login(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    let password = this.refs.pass.value;
    let _this = this;
    request.post(Constants.APIEndPoints.LOGIN)
      .send({ username: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            if (res.statusCode === 422) {
              _this.setState({message: 'Wrong username/password combination.'})
            } else {
              _this.setState({message: 'There was an error trying to log you in, please try again later.'})
            }
          } else {
            let json = JSON.parse(res.text);
            localStorage.setItem('insyto_token', json.access_token);
            window.location = "/";
            // TO DO LOG USER IN
          }
        }
      });
  }

  render() {
    return (
      <div className={'insyto-container insyto-container--large-padding'}>
        <form>
        <p className={'insyto-container__message'}>{this.state.message}</p>
        <div className={'form-field-container'}>
          <input name="email" type="email" placeholder="Email address" className={styles.signinform} ref='email'/>
        </div>
        <div className={'form-field-container'}>
          <input name="password" type="password" placeholder="Password" className={styles.signinform} ref='pass'/>
        </div>
        <div className={'form-field-container form-field-container--submit'}>
          <SubmitButton onSubmitFunc={this.login.bind(this)} text="Sign in"/>
        </div>
        </form>
      </div>
    );
  }
}

export default Relay.createContainer(LoginPage, {
  fragments: {},
});
