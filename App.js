/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {create} from 'apisauce';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const api = create({
  baseURL: 'https://api.github.com',
  headers: {Accept: 'application/vnd.github.v3+json'},
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [commits, setCommits] = useState([]);

  const getCommits = () => {
    api
      .get('/repos/dhanansoneji/Cats-Care/commits')
      .then(response =>
        response.data.map(e => {
          return {
            commitSHA: e.sha,
            author: e.commit.author.name,
            message: e.commit.message,
          };
        }),
      )
      .then(response => {
        setCommits(response);
        console.log(response);
      });
  };

  useEffect(() => {
    getCommits();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
