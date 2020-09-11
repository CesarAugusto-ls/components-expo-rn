import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const Maps = (props) => {
    const [location, setLocation] = React.useState(props.location);
    const [errorMsg, setErrorMsg] = React.useState(null);

    React.useEffect(() => {
        setLocation(props.location);
    }, [props.location])

    React.useEffect(() => {
        firstRequest();

        async function firstRequest() {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            Location.watchPositionAsync({
                accuracy: Location.Accuracy.Balanced,
                distanceInterval: 100,
            }, (location) => {
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                    speed: location.coords.speed * 3.6
                });
            },
                error => {
                    console.log(error)
                });
        }
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                showsUserLocation
                showsMyLocationButton
                region={location}
            />
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

export default Maps;