/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {create} from 'apisauce';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './components/MyHeader';

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
  const [refreshing, setRefreshing] = useState(false);

  const getCommits = () => {
    api
      .get('/repos/dhanansoneji/FetchGitCommits/commits?per_page=25')
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

  const onRefresh = () => {
    setRefreshing(true);
    getCommits();
    setRefreshing(false);
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
          styles.textSize,
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
    color: '#228B22',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  textSHA: {
    color: '#0096FF',
  },
  textSize: {
    fontSize: 16,
  },
});

export default App;
