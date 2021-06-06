import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from "react-native-elements";

function SignUpView() {
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text h2 style={styles.title}>Sign Up</Text>
          <Text style={styles.subtittle}>Join Us!</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleView: {

    },
    title: {

    },
    subtittle: {

    },
});

export default SignUpView;