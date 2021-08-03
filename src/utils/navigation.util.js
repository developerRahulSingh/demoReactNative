import { Dimensions, Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import screenId from "../constants/screen.id.enum";
import stackName from "../constants/stack.name.enum";

const NavigationUtil = {
  setDefaultOptions: () => {
    const screenWidth = parseInt(
      parseFloat(Dimensions.get("window").width).toFixed(0),
    );
    Navigation.setDefaultOptions({
      popGesture: false,
      topBar: {
        visible: false,
        drawBehind: true,
        animate: false,
        height: 0,
      },
      layout: {
        orientation: "portrait",
        backgroundColor: "#ffffff",
        componentBackgroundColor: "#ffffff",
      },
      animations: {
        setRoot: {
          alpha: { from: 0, to: 1, duration: 250, interpolation: "decelerate" },
          translationX: {
            from: screenWidth,
            to: 0,
            duration: 350,
            interpolation: "decelerate",
          },
          waitForRender: true,
        },
        setStackRoot: {
          alpha: { from: 0, to: 1, duration: 250, interpolation: "decelerate" },
          translationX: {
            from: screenWidth,
            to: 0,
            duration: 350,
            interpolation: "decelerate",
          },
          waitForRender: true,
        },
        pop: {
          content: {
            alpha: {
              from: 1,
              to: 0.2,
              duration: 250,
              interpolation: "decelerate",
            },
            translationX: {
              from: 0,
              to: screenWidth,
              duration: 350,
              interpolation: "decelerate",
            },
            waitForRender: true,
          },
        },
        push: {
          content: {
            alpha: { from: 0, to: 1, duration: 250, interpolation: "decelerate" },
            translationX: {
              from: screenWidth,
              to: 0,
              duration: 350,
              interpolation: "decelerate",
            },
            waitForRender: true,
          },
        },
        // these animations will not used as of now as the popups are not using the modal as of now
        showModal: {
          enabled: true,
          alpha: { from: 0, to: 1, duration: 250, interpolation: "decelerate" },
          scaleX: {
            from: 0.7,
            to: 1,
            duration: 350,
            interpolation: "decelerate",
          },
          scaleY: {
            from: 0.7,
            to: 1,
            duration: 350,
            interpolation: "decelerate",
          },
          waitForRender: true,
        },
        dismissModal: {
          enabled: true,
          alpha: { from: 1, to: 0, duration: 250, interpolation: "decelerate" },
          scaleX: {
            from: 1,
            to: 0.6,
            duration: 350,
            interpolation: "decelerate",
          },
          scaleY: {
            from: 1,
            to: 0.6,
            duration: 350,
            interpolation: "decelerate",
          },
          waitForRender: true,
        },
      },
    });
  },

  showLoginPageAtStartUp: async () => {
    return Navigation.setRoot({
      root: {
        stack: {
          id: stackName.AuthenticationStack,
          children: [
            {
              component: {
                name: screenId.Auth.Login.LoginPage,
                passProps: {
                  navigationProps: {}, // we are intentionally passing the empty object here so that the null check can be avoided
                },
                options: {
                  statusBar: {
                    visible: true,
                  },
                  animations: {
                    setRoot: {
                      alpha: {
                        from: 0,
                        to: 1,
                        duration: 250,
                        interpolation: "decelerate",
                      },
                      waitForRender: true,
                    },
                  },
                },
              },
            },
          ],
        },
      },
    });
  },
  reset: async currentScreenID => {
    return Navigation.popToRoot(currentScreenID);
  },
  resetTo: async (
    stackID: string,
    screenID: string,
    navigationProps: any = {},
  ) => {
    return Navigation.setRoot({
      root: {
        stack: {
          id: stackID,
          children: [
            {
              component: {
                name: screenID,
                options: {
                  statusBar: {
                    visible: false,
                  },
                },
                passProps: {
                  navigationProps: navigationProps,
                },
              },
            },
          ],
        },
      },
    });
  },
  resetToStackRoot: async (
    currentScreenID: string,
    screenID: string,
    navigationProps: any = {},
  ) => {
    return Navigation.setStackRoot(currentScreenID, {
      component: {
        name: screenID,
        options: {
          statusBar: {
            visible: false,
          },
        },
        passProps: {
          navigationProps: navigationProps,
        },
      },
    });
  },
  goBack: async currentScreenID => {
    return Navigation.pop(currentScreenID);
  },
  goBackToScreen: async currentScreenID => {
    return Navigation.popTo(currentScreenID);
  },
  gotoLogin: async () => {
    return NavigationUtil.resetTo(
      stackName.AuthenticationStack,
      screenId.Auth.Login.LoginPage,
    );
  },
  gotoScreen: async (currentScreenID, nextScreenID, navigationProps) => {
    return Navigation.push(currentScreenID, {
      component: {
        name: nextScreenID,
        options: {
          statusBar: {
            visible: false,
          },
        },
        passProps: {
          navigationProps: navigationProps,
        },
      },
    });
  },
  gotoScreenWithHideBottomTabs: async (
    currentScreenID: string,
    nextScreenID: string,
    navigationProps: any = {},
  ) => {
    return Navigation.push(currentScreenID, {
      component: {
        name: nextScreenID,
        options: {
          statusBar: {
            visible: true,
          },
          bottomTabs: {
            visible: false,
          },
        },
        passProps: {
          navigationProps: navigationProps,
        },
      },
    });
  },
  showOverlay: async (overlayID: string, passProps: any = null) => {
    return Navigation.showOverlay({
      component: {
        name: overlayID,
        passProps: passProps,
        options: {
          layout: {
            backgroundColor: "transparent",
            componentBackgroundColor: "transparent",
          },
          statusBar: {
            visible: false,
          },
          overlay: {
            interceptTouchOutside: true,
          },
        },
      },
    });
  },
  showProgressIndicator: async () => {
    return NavigationUtil.showOverlay(screenId.Overlays.ProgressIndicator);
  },
  showAlert: async props => {
    return NavigationUtil.showOverlay(screenId.Overlays.CommonAlert, props);
  },
  gotoDashboardTab: async componentID => {
    Navigation.mergeOptions(componentID, {
      bottomTabs: {
        currentTabIndex: 2,
      },
    });
  },
};

export default NavigationUtil;
