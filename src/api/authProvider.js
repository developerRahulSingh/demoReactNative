import React from "react";
import auth from "@react-native-firebase/auth";

export default class AuthProvider {

  static registerUser(userEmail, password) {
    try {
      return auth().createUserWithEmailAndPassword(userEmail, password);
    } catch (e) {
      console.log(e);
    }
  };

  static loginUser(userEmail, password) {
    try {
      return auth().signInWithEmailAndPassword(userEmail, password).then(async response => {
        return response;
      }).catch((e) => {
        console.log("e =>>", e);
      });
    } catch (e) {
      console.log(e);
    }
  };

  static logoutUser(userEmail, password) {
    try {
      return auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

}
