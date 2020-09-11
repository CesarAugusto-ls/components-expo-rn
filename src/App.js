import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Maps from './components/Maps';
import Speedometer from './components/Speedometer';

export default function App() {
  const [location, setLocation] = React.useState(null);

  return (
    <View style={styles.container}>
      <Maps
        style={styles.mapStyle}
        onUpdateLocation={(newLocation) => setLocation(newLocation)}
      />
      <Speedometer
        speed={location ? location.speed : 0}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
