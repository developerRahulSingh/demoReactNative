import {Component} from 'react';
import {BackHandler} from 'react-native';
import {Navigation} from 'react-native-navigation';
// import {store} from '../../config/reduxStore/configure.store';
// import {commonTheme} from '../../themes/common.theme';
import NavigationUtil from '../../utils/navigation.util';

class BasePage extends Component {
  _isMounted = false;
  _handleBackButton: boolean;
  _backButtonHandler: any = null;

  constructor(props, state = {}, handleBackButton: boolean = false) {
    super(props);
    this.state = {
      ...state,
    };
    this._isMounted = true;
    this._handleBackButton = handleBackButton;

    // console.debug(`%c${this.constructor.name}: %cReceiving Props`, 'color: ' + commonTheme.COLOR_PRIMARY + '; font-weight: bold',
    //   'color: ' + commonTheme.COLOR_SECONDARY + '; font-weight: bold', this.props);
    // console.debug(`%c${this.constructor.name}: %cCurrent Store`, 'color: ' + commonTheme.COLOR_PRIMARY + '; font-weight: bold',
    //   'color: ' + commonTheme.COLOR_SECONDARY + '; font-weight: bold', store.getState());

    // this is only required when we are required to listen to events like `componentDidAppear` and `componentDidDisappear`
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  _exitApp = async () => {
    BackHandler.exitApp();
  };

  componentDidAppear() {
    if (this._handleBackButton && !!this._backButtonHandler) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this._backButtonHandler,
      );
    }
  }

  componentDidDisappear() {
    if (this._handleBackButton && !!this._backButtonHandler) {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this._backButtonHandler,
      );
    }
  }

  componentWillUnmount() {
    // Not mandatory
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
    this._isMounted = false;
  }

  // _getBackToMainScreen = () => {
  //   let componentID = store.getState().commonDataStore.componentID;
  //   if (componentID) {
  //     return NavigationUtil.goBackToScreen(componentID);
  //   } else {
  //     return NavigationUtil.reset(this.props.componentId);
  //   }
  // };

  // _navCloseButtonClick = () => {
  //   return NavigationUtil.showAlert({
  //     messageText: 'Are you sure you want to cancel this process?',
  //     onRightButtonPress: async () => {
  //       return this._getBackToMainScreen();
  //     },
  //     onLeftButtonPress: () => null,
  //   });
  // };
}

export {BasePage};
