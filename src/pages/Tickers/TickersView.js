import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, SafeAreaView } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";
import config from "../../../config";
import axios from "axios";

function TickersView() {
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
 
  const fetchingTickers = () => {
    axios
      .get(
        `https://api.nomics.com/v1/currencies/ticker?key=${config.NOMICS_API_KEY}&ids=BTC,ETH,XRP,DOGE,LTC,BCH,XLM,USDT,BNB,XMR&interval=1d&per-page=100&page=1`
      )
      .then((response) => {
        setRefreshing(true);
        setList(response.data);
      }).then(
          () => {
              setRefreshing(false);
          }
      )
      .catch(console.error);
  };
  useEffect(() => {
    fetchingTickers();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
      refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={fetchingTickers}
          />
      }
      >
        {list.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar title={l.symbol} source={{ uri: l.logo_url }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle style={{ color: "#86939e", fontSize: 13 }}>
                {l.symbol}
              </ListItem.Subtitle>
            </ListItem.Content>
            <Text>${l.price}</Text>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default TickersView;
