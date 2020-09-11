import React from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Text, Dimensions, View } from 'react-native';
import { ceil } from 'react-native-reanimated';

const Maps = (props) => {
    const [location, setLocation] = React.useState(null);
    const [address, setAddress] = React.useState(null);

    React.useEffect(() => {
        firstRequest();

        async function firstRequest() {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied')
            } else {
                Location.watchPositionAsync({
                    accuracy: Location.Accuracy.Balanced,
                    distanceInterval: 100,
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

                    getAddress(locationData.latitude, locationData.longitude)
                },
                    error => {
                        console.log(error)
                    });
            }
        }
    }, []);

    async function getAddress(latitude, longitude) {
        const locationAddress = {
            latitude: latitude,
            longitude: longitude,
        }
        const newAddress = await Location.reverseGeocodeAsync(locationAddress)
        setAddress(newAddress[0]);
    }

    const addressComplete =
        address ?
            `${address.name}, ${address.city} - ${address.region} ${address.postalCode}, ${address.country} - ${address.isoCountryCode}
            `
            :
            '';

    return (
        <>
            <MapView
                style={props.style}
                showsUserLocation
                showsMyLocationButton
                region={location}
            />
            <View style={{
                position: 'absolute', top: 100,
                backgroundColor: '#fff',
                width: '90%',
                height: 100,
                borderRadius: 50,
                opacity: 0.8,
                padding: 24,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        color: '#000',
                        fontSize: 16,
                        width: '90%',
                        alignItems: "center"
                    }}
                >
                    {addressComplete}
                </Text>

            </View>
            <View style={{
                position: 'absolute', top: 200,
                backgroundColor: '#fff',
                width: '60%',
                opacity: 0.8,
            }}>
                <Text
                    style={{
                        color: '#000',
                        fontSize: 8,
                        width: '90%',
                        textAlign: "center"
                    }}
                >
                    {location ?
                        `latitude: ${location.latitude}  Longitude: ${location.longitude}`
                        :
                        ''
                    }
                </Text>
            </View>

        </>
    );
}

export default Maps;