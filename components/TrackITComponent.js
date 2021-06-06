import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { setGpu, setPrice } from "../redux/appSlice";
import config from "../config";

function TrackIT() {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.app.price);
  const gpu = useSelector((state) => state.app.gpu);

  const [asin, setAsin] = useState("B091H2KFDH");

  // asin3060: "B091H2KFDH",
  // asin3070: "B08YQNGXBL",
  // asin3080: "B0936GL8WP"

  //gpu is selected value state

  const fetchPrice = () => {
    fetch(
      `https://amazon-price1.p.rapidapi.com/priceReport?marketplace=US&asin=${asin}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": config.RAPID_API_KEY,
          "x-rapidapi-host": "amazon-price1.p.rapidapi.com",
        },
      }
    )
      .then( response => response.json())
      .then(data => {
        const apiPrice = data
        dispatch(
          setPrice(
            apiPrice.prices.priceNew ? ("$" + (apiPrice.prices.priceNew / 100).toFixed(2)) : "Out of stock"
          )
        );
        console.log(apiPrice)
      })
      .catch((err) => {
        console.error(err);
      })
    }

    useEffect(() => {
      console.log("Mounting");
      fetchPrice()});

  const gpuToAsin = (gpuValue) => {
    if (gpuValue === "RTX3060") {
      setAsin("B091H2KFDH")
    } else if (gpuValue === "RTX3070") {
      setAsin("B08YQNGXBL")
    } else {
      setAsin("B0936GL8WP")
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.4, marginTop: 70 }}>
        <Text style={styles.pickerTitle}>
          Select a GPU to be shown its current price:{" "}
        </Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.priceText}>
          Current {gpu} price is: {price}
        </Text>
      </View>
      <View style={{ flex: 0.5 }}>
        <Picker
          selectedValue={gpu}
          onValueChange={(itemValue, itemIndex) => {
            console.log("Selected " + itemValue);
            dispatch(setGpu(itemValue));
          }}
          style={styles.picker}
        >
          <Picker.Item label="Nvidia RTX 3060" value="RTX3060" />
          <Picker.Item label="Nvidia RTX 3070" value="RTX3070" />
          <Picker.Item label="Nvidia RTX 3080" value="RTX3080" />
        </Picker>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          raised
          title="Submit"
          onPress={() => {
            console.log("Submit button pressed");
            gpuToAsin(gpu);
            fetchPrice();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "center",
  },
  picker: {
    color: "#ffffff",
    backgroundColor: "#2459E0",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    padding: 30,
  },
  priceView: {
    flex: 0.2,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default TrackIT;
