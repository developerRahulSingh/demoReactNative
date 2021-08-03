import { StyleSheet } from 'react-native';

const pageStyle = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#13446b',
    flex: 1,
  },
  registrationTextStyle: {
    fontSize: 32,
    color: '#ffffff',
    paddingTop: 16,
    paddingBottom: 8,
  },
  keyboardScrollViewStyle: {
    flex: 1,
    padding: 32,
  },
  bottomButtonViewStyles: {
    width: '100%',
    padding: 32,
  },
  signUpViewStyles: {
    width: '100%',
    paddingTop: 16,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  alreadyMemberTextStyle: {
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 14,
  },
  signUpTextStyle: {
    color: '#3C46BB',
    fontSize: 14,
  },
  commonTextStyle: {
    color: '#ffffff',
    paddingBottom: 16,
  },
  discriptionTextStyle: {
    fontSize: 16,
  },
});

export { pageStyle };
