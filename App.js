import React, {Component} from "react";
import { Navigation } from "react-native-navigation";
import auth from '@react-native-firebase/auth';
import screenId from "./src/constants/screen.id.enum";
import NavigationUtil from "./src/utils/navigation.util";
import LoginPage from "./src/screens/auth/login/login.page";
import RegistrationPage from "./src/screens/auth/registration/registration.page";
import DashboardPage from "./src/screens/dashboard/dashboard.page";


export class App {
  constructor() {
    this._registerComponents();
    // this.state = {
    //   user : null,
    //   initializing : true,
    // };

    // this must be the first action in the application lifecycle initiation
    Navigation.events().registerAppLaunchedListener(async () => {
      //Change default launcher screen to login
      NavigationUtil.setDefaultOptions();
      await NavigationUtil.showLoginPageAtStartUp();
    });
  }
  // onAuthStateChanged = () => {
  //   this.setState({
  //     user: this.state.user,
  //   });
  //   if (this.state.initializing) {
  //     this.setState({
  //       initializing: false,
  //     });
  //   }
  // }
  // componentDidMount() {
  //   const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
  //   console.log('subscriber ==>> ', subscriber);
  //   return subscriber;
  // }

  _registerComponents() {
    // this is the first screen component, so registering it first so that the app screen can be launched
    Navigation.registerComponent(screenId.Auth.Login.LoginPage, () => LoginPage);
    Navigation.registerComponent(screenId.Auth.Registration.RegistrationPage, () => RegistrationPage);``
    Navigation.registerComponent(screenId.Dashboard.Page, () => DashboardPage);``
  }
}
