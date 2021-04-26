/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  Linking,
} from 'react-native';

import Header from './components/MyHeader';

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
    flex: 1,
  };

  const [commits, setCommits] = useState([]);

  const getCommits = () => {
    api
      .get('/repos/dhanansoneji/FetchGitCommits/commits')
      .then(response =>
        response.data.map(e => {
          return {
            commitSHA: e.sha,
            author: e.commit.author.name,
            message: e.commit.message,
            url: e.html_url,
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

  const keyExtractor = (item, index) => index.toString();

  const loadInBrowser = url => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const renderItem = ({item}) => (
    <Pressable
      style={[
        {backgroundColor: isDarkMode ? Colors.black : Colors.white},
        styles.listItem,
      ]}
      onPress={() => loadInBrowser(item.url)}>
      <Text style={styles.textAuthor}>@{item.author}</Text>
      <Text style={[styles.textSHA, styles.marginTop]}>{item.commitSHA}</Text>
      <Text
        style={[
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
          styles.marginTop,
        ]}>
        {item.message}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header title="Fetch Git Commits" isDarkMode={isDarkMode} />
      <View style={styles.marginTop} />
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={keyExtractor}
        data={commits}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: 10,
  },
  listItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  textAuthor: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
  textSHA: {
    color: '#0096FF',
  },
});

export default App;
