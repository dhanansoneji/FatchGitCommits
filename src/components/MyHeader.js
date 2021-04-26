import React from 'react';
import {StyleSheet} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function MyHeader({title, isDarkMode}) {
  return (
    <Header
      statusBarProps={{translucent: true}}
      backgroundColor={isDarkMode ? Colors.black : Colors.white}
      containerStyle={styles.container}
      leftComponent={
        <Icon
          name="git-commit"
          type="ionicon"
          size={30}
          color={isDarkMode ? Colors.white : Colors.black}
        />
      }
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
