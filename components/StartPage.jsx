import { StatusBar } from "expo-status-bar";
import { Button, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import { getCityName } from "../api/GetCityName";
import * as Location from "expo-location";
import QuestionPage from "./QuestionPage";

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
    setLocation(data[0]);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {location ? (
        <QuestionPage cityName={location.name} />
      ) : (
        <Button
          title={isLoading ? "Loading..." : "Press to Start"}
          disabled={isLoading}
          onPress={handleGameStart}
        />
      )}
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
