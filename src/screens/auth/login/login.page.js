import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import {
  IconBasedTextInput,
  LightText,
  NotchPushComponent,
  StandardButton,
} from "../../../components";
import screenId from "../../../constants/screen.id.enum";
import NavigationUtil from "../../../utils/navigation.util";
import { pageStyle } from "./login.page.style";
import AuthProvider from "../../../api/authProvider";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    //Todo: remove username password.
    this.state = {
      username: "test@test.com",
      password: "Pass@1234",
    };

    this.inputs = {};
    this._signInButtonPressed = this._signInButtonPressed.bind(this);
    this._signUpButtonPressed = this._signUpButtonPressed.bind(this);
  }

  _signInButtonPressed = async () => {
    return AuthProvider.loginUser(this.state.username, this.state.password)
      .then(async result => {
        const jwtToken = await result.user?.getIdToken();
        return NavigationUtil.gotoScreen(this.props.componentId, screenId.Dashboard.Page, {
          result: result,
          token: jwtToken,
        });
      })
      .catch(() => null);
    // await NavigationUtil.gotoScreen(this.props.componentId, screenId.Dashboard.Page);

  };

  _signUpButtonPressed = async () => {
    await NavigationUtil.gotoScreen(
      this.props.componentId,
      screenId.Auth.Registration.RegistrationPage,
    );
  };

  _focusNextInputField = async nextField => {
    if (nextField === "done") {
      if (
        !!this.state.username &&
        this.state.username.length >= 6 &&
        !!this.state.password
      ) {
        await this._signInButtonPressed();
      } else {
        return NavigationUtil.showAlert({
          messageText: "Enter correct credential.",
        });
      }
    } else {
      this.inputs[nextField].focus();
    }
  };

  checkIfFieldsAreNotEmpty = (type, value) => {
    if (type === "username") {
      this.setState({
        username: value,
      });
    }
    if (type === "password") {
      this.setState({
        password: value,
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={pageStyle.sectionContainer}>
        <NotchPushComponent />
        <View style={pageStyle.textInputViewStyle}>
          <IconBasedTextInput
            onRef={ref => {
              this.inputs.email = ref;
            }}
            onSubmitEditing={async () => {
              await this._focusNextInputField("password");
            }}
            borderColor={"#ffffff"}
            title={"Email"}
            placeholderTextColor={"#999999"}
            titleColor={"#ffffff"}
            placeholderText={"example@email.com"}
            value={this.state.username}
            onChangeText={username =>
              this.checkIfFieldsAreNotEmpty("username", username)
            }
          />
          <IconBasedTextInput
            onRef={ref => {
              this.inputs.password = ref;
            }}
            onSubmitEditing={async () => {
              await this._focusNextInputField("done");
            }}
            borderColor={"#ffffff"}
            title={"Password"}
            placeholderTextColor={"#999999"}
            titleColor={"#ffffff"}
            placeholderText={"Password"}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={password =>
              this.checkIfFieldsAreNotEmpty("password", password)
            }
          />
        </View>
        <View style={pageStyle.signUpViewStyles}>
          <StandardButton
            onPress={this._signInButtonPressed}
            showBorder
            borderColor={"#A2EE43"}
            labelColor={"#000000"}
            labelText={"Sign in"}
          />
        </View>
        <View style={[pageStyle.signInViewStyles]}>
          <LightText style={pageStyle.notYetMemberTextStyle}>
            Not yet a member?{" "}
          </LightText>
          <TouchableOpacity onPress={this._signUpButtonPressed}>
            <LightText style={pageStyle.signUpTextStyle}>Sign up</LightText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
