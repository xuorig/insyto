import React from 'react';
import Relay from 'react-relay';
import 'babel/polyfill';

import globalStyles from '../Shared/GlobalStyles.css';
import styles from './LoginPage.css';
import Button from '../Shared/Buttons/Button';
import SubmitButton from '../Shared/Buttons/SubmitButton';
import request from 'superagent';
import APIEndPoints from '../../constants/Constants';

class LoginPage extends React.Component {
  login(email, password) {
    request.post(APIEndPoints.LOGIN)
      .send({ username: email, password: password, grant_type: 'password' })
      .set('Accept', 'application/json')
      .end(function(error, res){
        if (res) {
          if (res.error) {
            console.log('errors');
          } else {
            json = JSON.parse(res.text);
            console.log(json);
            // TO DO LOG USER IN
          }
        }
      });
  }

  render() {
    return (
      <div className={'insyto-container insyto-container--large-padding'}>
        <div className={'form-field-container'}>
          <input name="email" type="email" placeholder="Email address"/>
        </div>
        <div className={'form-field-container'}>
          <input name="password" type="password" placeholder="Password"/>
        </div>
        <div className={'form-field-container form-field-container--submit'}>
          <SubmitButton onClickFunc={this.login.bind(this)} text="Sign in"/>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(LoginPage, {
  fragments: {},
});
