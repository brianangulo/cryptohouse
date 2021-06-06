import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import { Input } from "react-native-elements";

function ContactComponent({ control, errors, handleSubmit, Controller }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 60, padding: 20 }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Subject: "
              placeholder="Subject to your message"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="subject"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.subject && (
          <Text style={styles.errText}>This is required.</Text>
        )}
      </View>
      <View style={{ padding: 20 }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.formBody}
              label="Body: "
              placeholder="Please provide any feedback..."
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              multiline={true}
            />
          )}
          name="body"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.body && <Text style={styles.errText}>This is required.</Text>}
      </View>
      <View style={{ padding: 20 }}>
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formSubject: {},
  formBody: {
    height: 100,
    borderColor: "#000000",
  },
  errText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ContactComponent;
