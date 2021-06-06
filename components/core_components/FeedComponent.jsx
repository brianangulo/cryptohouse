//Core
import React from "react";
import { FlatList } from "react-native";
//importing some dependencies
import { ListItem, Icon } from "react-native-elements";
//Url previewer
import RNUrlPreview from "react-native-url-preview";

function FeedList(props) {
  //Extracting keys in order to use with the Flatlist RN component
  const keyExtractor = (item, index) => {
    return index.toString();
  };
  //A render item function that will be provided to FLatList comp. it uses listitem from RNE
  const renderItem = ({ item }) => {
    return (
      <ListItem bottomDivider disabled>
        <ListItem.Content>
          <RNUrlPreview text={item.link} />
        </ListItem.Content>
        <Icon
          type="font-awesome"
          name="heart"
          reverse
          reverseColor="white"
          size={20}
          color="#2459E0"
        />
      </ListItem>
    );
  };

  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={props.url}
      renderItem={renderItem}
    />
  );
}

export default FeedList;
