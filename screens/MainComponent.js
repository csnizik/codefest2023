import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import LocationComponent from '../components/LocationComponent'
import SlideInCardComponent from '../components/SlideInCardComponent'

export default function MainComponent() {
  const [location, setLocation] = useState(null)

  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <LocationComponent onLocationSet={setLocation} />
        {location && (
          <>
          <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221,
            }}
            >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={'Your location'}
            />
          </MapView>
          <SlideInCardComponent position="top" direction="right">
            <Text>Testing slide in card</Text>
          </SlideInCardComponent>
          </>
        )}
      </View>
    </>
  )
}

// Styles omitted for brevity

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  mapStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  textInputStyle: {
    fontSize: 18,
    width: 150,
    height: 35,
    borderColor: 'black',
    borderWidth: 1,
  },
})
