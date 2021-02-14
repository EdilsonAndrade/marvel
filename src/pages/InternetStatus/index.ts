import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

NetInfo.addEventListener((state) => {
  if (!state.isConnected) {
    Alert.alert(
      'Internet',
      'Internet connection not detected',
    );
  }
});
