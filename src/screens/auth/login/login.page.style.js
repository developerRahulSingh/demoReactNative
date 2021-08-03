import { StyleSheet } from 'react-native';

const pageStyle = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#13446b',
    flex: 1,
    justifyContent: 'center',
  },
  signUpViewStyles: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  signInViewStyles: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  notYetMemberTextStyle: {
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 14,
  },
  signUpTextStyle: {
    color: '#A2EE43',
    fontSize: 14,
  },
  textInputViewStyle: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    position: 'absolute',
    top: '45%',
    width: '100%',
  },
});

export { pageStyle };
