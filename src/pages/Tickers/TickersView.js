import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl, SafeAreaView } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

function TickersView() {
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
 
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
