import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const handleGameStart = async () => {
    setIsLoading(true);
    const data = await Location.getCurrentPositionAsync();
    setLocation(data);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {location && (
        <>
          <p>location.latitude</p>
        </>
      )}
      <Button
        title="Press to Start"
        loading={isLoading}
        loadingIndicatorPosition="overlay"
        onPress={handleGameStart}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
