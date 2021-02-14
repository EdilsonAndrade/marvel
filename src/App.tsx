import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ComicProvider } from './hooks/GetComics';
import Routes from './routes';
import './pages/InternetStatus';

const App: React.FC = () => (
  <ComicProvider>
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  </ComicProvider>
);
export default App;
