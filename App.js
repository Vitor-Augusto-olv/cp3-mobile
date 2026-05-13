import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProvider } from './context/UserContext';
import CadastroScreen from './screens/CadastroScreen';
import PerfilScreen from './screens/PerfilScreen';
import DevsScreen from './screens/DevsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Cadastro"
          screenOptions={{
            headerStyle: { backgroundColor: '#0F0F0F' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: '700' },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: '#0F0F0F' },
          }}
        >
          <Stack.Screen
            name="Cadastro"
            component={CadastroScreen}
            options={{ title: 'Cadastro' }}
          />
          <Stack.Screen
            name="Perfil"
            component={PerfilScreen}
            options={{ title: 'Meu Perfil' }}
          />
          <Stack.Screen
            name="Devs"
            component={DevsScreen}
            options={{ title: 'Equipe Dev' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
