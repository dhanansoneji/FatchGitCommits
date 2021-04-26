import React from 'react';
import {StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function MyHeader({title, isDarkMode}) {
  return (
    <Header
      statusBarProps={{translucent: true}}
      backgroundColor={isDarkMode ? Colors.black : Colors.white}
      containerStyle={styles.container}
      centerComponent={{
        text: title,
        style: {
          color: isDarkMode ? Colors.white : Colors.black,
          fontWeight: 'bold',
          fontSize: 22,
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
  },
});

export default MyHeader;
