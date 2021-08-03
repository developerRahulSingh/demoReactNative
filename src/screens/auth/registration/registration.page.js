import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BoldText, IconBasedTextInput, LightText, MediumText, StandardButton } from '../../../components';
import screenId from '../../../constants/screen.id.enum';
import NavigationUtil from '../../../utils/navigation.util';
import { BasePage } from '../../common/base.page';
import { pageStyle } from './registration.page.style';
import AuthProvider from "../../../api/authProvider";

export default class RegistrationPage extends BasePage {
  constructor(props) {
    super(props, {
      username: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    });

    this.inputs = {};
    this._continueButtonPressed = this._continueButtonPressed.bind(this);
    this._signInButtonPressed = this._signInButtonPressed.bind(this);
  }

  _continueButtonPressed = async () => {
    await AuthProvider.registerUser(this.state.username, this.state.password);
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Auth.Login.LoginPage);
  };
  _signInButtonPressed = async () => {
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Auth.Login.LoginPage);
  };

  _focusNextInputField = async (nextField) => {
    if (nextField === 'done') {
      if (!!this.state.username && this.state.username.length >= 6 && !!this.state.password && !!this.state.phoneNumber && !!this.state.confirmPassword && (this.state.password === this.state.confirmPassword)) {
        await this._continueButtonPressed();
      } else {
        return NavigationUtil.showAlert({messageText: 'Enter all detail for registration.'});
      }
    } else {
      this.inputs[nextField].focus();
    }
  };

  checkIfFieldsAreNotEmpty = (type, value) => {
    if (type === 'username') {
      this.setState({
        username: value,
      });
    }
    if (type === 'phoneNumber') {
      this.setState({
        phoneNumber: value,
      });
    }
    if (type === 'password') {
      this.setState({
        password: value,
      });
    }
    if (type === 'confirmPassword') {
      this.setState({
        confirmPassword: value,
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={pageStyle.sectionContainer}>
        <KeyboardAwareScrollView
          bounces={false}
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={pageStyle.keyboardScrollViewStyle}
        >
          <BoldText style={pageStyle.registrationTextStyle}>Registration</BoldText>
          <MediumText
            style={[
              pageStyle.commonTextStyle,
              pageStyle.discriptionTextStyle,
            ]}>
            Please enter your mobile number, then we will send OTP to verify
          </MediumText>
          <IconBasedTextInput
            onRef={(ref) => {
              this.inputs['username'] = ref;
            }}
            onSubmitEditing={async () => {
              await this._focusNextInputField('phoneNumber');
            }}
            borderColor={'#ffffff'}
            title={'Email'}
            placeholderTextColor={'#999999'}
            titleColor={'#ffffff'}
            placeholderText={'example@email.com'}
            value={this.state.username}
            onChangeText={(username) => this.checkIfFieldsAreNotEmpty('username', username)}
            textInputContainerStyle={{flex: 1, marginBottom: 8}}
          />
          <IconBasedTextInput
            onRef={(ref) => {
              this.inputs['phoneNumber'] = ref;
            }}
            onSubmitEditing={async () => {
              await this._focusNextInputField('password');
            }}
            borderColor={'#ffffff'}
            title={'Phone number'}
            placeholderTextColor={'#999999'}
            titleColor={'#ffffff'}
            placeholderText={'Phone number'}
            value={this.state.phoneNumber}
            onChangeText={(phoneNumber) => this.checkIfFieldsAreNotEmpty('phoneNumber', phoneNumber)}
            textInputContainerStyle={{flex: 1, marginBottom: 8}}

          />
          <IconBasedTextInput
            onRef={(ref) => {
              this.inputs['password'] = ref;
            }}
            onSubmitEditing={async () => {
              await this._focusNextInputField('confirmPassword');
            }}
            borderColor={'#ffffff'}
            title={'Enter Password'}
            placeholderTextColor={'#999999'}
            titleColor={'#ffffff'}
            placeholderText={'Enter Password'}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password) => this.checkIfFieldsAreNotEmpty('password', password)}
            textInputContainerStyle={{flex: 1, marginBottom: 8}}

          />
          <IconBasedTextInput
            onRef={(ref) => {
              this.inputs['confirmPassword'] = ref;
            }}
            onSubmitEditing={async () => {
              await this._focusNextInputField('done');
            }}
            borderColor={'#ffffff'}
            title={'Confirm Password'}
            placeholderTextColor={'#999999'}
            titleColor={'#ffffff'}
            placeholderText={'Confirm Password'}
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.checkIfFieldsAreNotEmpty('confirmPassword', confirmPassword)}
            textInputContainerStyle={{flex: 1, marginBottom: 8}}

          />
        </KeyboardAwareScrollView>
        <View style={pageStyle.bottomButtonViewStyles}>
          <StandardButton
            onPress={this._continueButtonPressed}
            showBorder
            borderColor={"#A2EE43"}
            labelColor={"#000000"}
            labelText={'Continue'}
          />
          <View style={pageStyle.signUpViewStyles}>
            <LightText style={pageStyle.alreadyMemberTextStyle}>Already member? </LightText>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={this._signInButtonPressed}>
              <LightText style={pageStyle.signUpTextStyle}> Sign in</LightText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
