import React from 'react';
import { StyleSheet, Dimensions, FlatList, View } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const renderItem = ({ item }) => {
    console.log('renderItem function:');
    let sentence = '';
    if( item.Wins == '1'){
        sentence = ' with ' + item.Wins + ' win ';
    }else {
        sentence = ' with ' + item.Wins + ' wins ';
    }
    return (
        <View style={styles.row}>
            <Headline style={styles.txt}>{item.UserName}</Headline>
            <Subheading style={styles.txt}>{sentence}</Subheading>
        </View>
    )
}

const GetList = (props) => {
    console.log('GetList function:');
  return (
    <FlatList
        style={styles.flatListContainer}
        data={props.leaders}
        renderItem={renderItem}
        keyExtractor={item => item.ID}
    />
  );
}

export { GetList }
const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
    },
    row: {
        padding: 15,
        marginBottom: 5,
    },
    txt: {
        textAlign:  'right'
    },
});