//Core imports
import React, { useState } from 'react';
import {SafeAreaView} from 'react-native';
//Components imports
import FeedList from './FeedComponent';

function Feed() {
  //state + redux hooks
const [url, setUrl] = useState("");
const [refreshing, setRefreshing] = useState(false);
  //Fetching info
  const fetchLinks = () => {};

  return (
    <SafeAreaView>
      <FeedList url={url} refreshing={refreshing} fetchLinks={fetchLinks} />
    </SafeAreaView>
  );
}

export default Feed;
