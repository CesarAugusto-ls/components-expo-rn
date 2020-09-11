import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// import { Container } from './styles';

const Speedometer = (props) => {
    const speed = props.speed
    return (
        <>
            <View style={styles.speedometerBorder} />
            <View style={styles.speedometer}>
                <Text style={styles.speedometerText}>
                    {speed ?
                        speed > 0 ?
                            parseInt(speed)
                            : 0
                        : 0
                    }

                </Text>
                <Text style={styles.speedometerSubText}>
                    km/h
            </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    speedometer: {
        position: 'absolute', bottom: 100, left: 50,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF',
        alignItems: "center",
        justifyContent: "center",
    },
    speedometerBorder: {
        position: 'absolute', bottom: 92, left: 42,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#000',
        alignItems: "center",
        justifyContent: "center",
    },
    speedometerText: {
        color: '#000',
        justifyContent: "center",
        fontSize: 24,
        fontWeight: "bold"
    },
    speedometerSubText: {
        color: '#000',
        fontSize: 12
    },
});

export default Speedometer;