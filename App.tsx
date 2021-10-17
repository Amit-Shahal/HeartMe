import React from "react";
import { StyleSheet, View } from "react-native";
import AmIOk from "./pages/AmIOk";

export default function App() {
  return (
    <View style={styles.container}>
      <AmIOk />
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
