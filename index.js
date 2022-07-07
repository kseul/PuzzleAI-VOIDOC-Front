import React from 'react';
import {AuthContextProvider} from 'AuthContext';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

function ProviderApp() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

AppRegistry.registerComponent(appName, () => ProviderApp);
