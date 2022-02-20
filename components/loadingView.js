import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingView() {
  return (
    <View style={Styles.loading}>
      <ActivityIndicator size="large" color="grey" />
    </View>
  );
}

const Styles = StyleSheet.create({
  loading: {
    // backgroundColor: "red",
  },
});
