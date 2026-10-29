import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetalhesScreen from './src/screens/DetalhesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Séries' }} />
        <Stack.Screen name="Detalhes" component={DetalhesScreen} options={{ title: 'Episódios' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
