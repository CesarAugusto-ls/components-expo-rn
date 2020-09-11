import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Maps from './components/Maps';
import Speedometer from './components/Speedometer';

export default function App() {
  const [speed, setSpeed] = React.useState(0);

  return (
    <View style={styles.container}>
      <Maps
        updateSpeed={(speed) => setSpeed(speed)}
      />
      <Speedometer
        speed={speed}
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
});
