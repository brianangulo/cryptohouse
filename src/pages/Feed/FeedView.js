//Core imports
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native';
//Components imports
import FeedList from './FeedComponent';
//Api key
import {API_KEY} from '../../../keys';
//Axios
import axios from 'axios';

function Feed() {
  //state + redux hooks
const [url, setUrl] = useState("");
const [refreshing, setRefreshing] = useState(false);
  //Fetching info
  const fetchLinks = () => {
    const options = {
      method: 'GET',
      url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
       setRefreshing(true); 
       setUrl(response.data); 
      }).then(() => {setRefreshing(false);})
      .catch(function (error) {
        console.error(error);
      });
  };
  //Fetching the information on mount with useeffect hook
  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <SafeAreaView>
      <FeedList url={url} refreshing={refreshing} fetchLinks={fetchLinks} />
    </SafeAreaView>
  );
}

export default Feed;
