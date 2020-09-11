import React from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const Maps = (props) => {
    const [location, setLocation] = React.useState(null);

    React.useEffect(() => {
        firstRequest();

        async function firstRequest() {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
            } else {
                Location.watchPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                    distanceInterval: 10,
                }, (newLocation) => {
                    const locationData = {
                        latitude: newLocation.coords.latitude,
                        longitude: newLocation.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                        speed: newLocation.coords.speed * 3.6
                    }
                    setLocation(locationData);
                    props.onUpdateLocation(locationData);
                },
                    error => {
                        console.log(error)
                    });
            }
        }
    }, []);

    return (
        <MapView
            style={props.style}
            showsUserLocation
            showsMyLocationButton
            region={location}
        />
    );
}

export default Maps;