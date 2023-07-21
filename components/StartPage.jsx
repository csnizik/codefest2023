import { StatusBar } from "expo-status-bar";
import { Button, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { getCityName } from "../api/GetCityName";
import * as Location from "expo-location";

const StartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [status, requestPermission] = Location.useForegroundPermissions();

  const handleGameStart = async () => {
    setIsLoading(true);

    if (!status.granted) {
      await requestPermission();
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    const data = await getCityName({ latitude, longitude });

    setLocation(data);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {location && (
        <>
          <Text>{location.name}</Text>
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
};

const styles = StyleSheet.create({
  container: {
    padding: "5%",
    backgroundColor: "#dcf9fc",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default StartPage;
