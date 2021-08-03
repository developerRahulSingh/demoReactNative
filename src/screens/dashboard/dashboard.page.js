import React from "react";
import { View, Text } from "react-native";
import { BasePage } from "../common/base.page";
import { BoldText, MediumText, StandardButton } from "../../components";
import { pageStyle } from "./dashboard.page.style";
import AuthProvider from "../../api/authProvider";
import NavigationUtil from "../../utils/navigation.util";
import screenId from "../../constants/screen.id.enum";

export default class DashboardPage extends BasePage {
  constructor(props) {
    super(props);
    this._logoutButtonPressed = this._logoutButtonPressed.bind(this);
  }

  _logoutButtonPressed = async () => {
    await AuthProvider.logoutUser();
    await NavigationUtil.gotoScreen(this.props.componentId, screenId.Auth.Login.LoginPage);
  };

  render() {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <MediumText style={{ fontSize: 24 }}>Email:</MediumText>
        <BoldText
          style={{ fontSize: 24, paddingHorizontal: 16 }}>{this.props.navigationProps.result.user.email}</BoldText>
      </View>
      <MediumText style={{ flexWrap: "wrap" }}>{this.props.navigationProps.token}</MediumText>
      <View style={pageStyle.signUpViewStyles}>
        <StandardButton
          onPress={this._logoutButtonPressed}
          showBorder
          borderColor={"#A2EE43"}
          labelColor={"#000000"}
          labelText={"Logout"}
        />
      </View>
    </View>;
  }
}
