import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGameStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <View style={styles.container}>
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
