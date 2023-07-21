import React, { useState, useEffect } from 'react'
import {
  Platform,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import * as Location from 'expo-location'

export default function LocationComponent({ onLocationSet }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission to access location was denied')
        setLoading(false)
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      onLocationSet(location)
      setLoading(false)
    })()
  }, [])

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '50%',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
})
