import React from 'react';
import { ScrollView, StyleSheet, Linking } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { View, Text } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';

const wikipediaUrl = 'https://wikipedia.org/wiki/'
export default class ReviewCard extends React.Component {
  state = {
    expanded: false,
    icon_name: "expand-more"
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded }, () => this.updateIcon())
  };

  updateIcon = () => {
    if (!this.state.expanded) {
      this.setState({ icon_name: "expand-more" })
    } else {
      this.setState({ icon_name: "expand-less" })
    }
  }

  updateContent = () => {
    if (this.state.expanded) {
      return <View>
        <Paragraph style={styles.paragraph}>
          {this.props.info.biography}
        </Paragraph>
        <View style={styles.moreInfoIcons}>
          <FontAwesome name="imdb" size={35} />
          <TouchableOpacity style={styles.wikiBtn} onPress={this.WikiLink} >

            <FontAwesome name="wikipedia-w" size={30} />
          </TouchableOpacity>
        </View>
      </View>;
    } else {
      return null;
    }
  }

  WikiLink = () => {
    console.log('WikiLink function:');
    const CelebritiTittle = this.props.info.name;
    const WikiName_Format = CelebritiTittle.replace(" ", '_')
    Linking.openURL(wikipediaUrl + WikiName_Format)
  }

  render() {
    return (
      <ScrollView style={styles.content}>
        <Card style={{ flex: 1 }}>
          <Title style={styles.titleREveiwCard}>{this.props.info.name}</Title>
          <Card.Cover style={{ height: 400 }} source={{ uri: this.props.info.image }} />
          <Card.Actions>
            <TouchableOpacity style={styles.btnREveiwCard} onPress={this.handleExpandClick}>
              <MaterialIcons name={this.state.icon_name} size={30} />
              <Text style={styles.txtREveiwCard}>Read Biography</Text>
            </TouchableOpacity>
          </Card.Actions>
          <Card.Content>{this.updateContent()}</Card.Content>

        </Card>
      </ScrollView>
    )
  }
}

styles = StyleSheet.create({
  content: {
    flex: 1,
    textAlign: 'auto',
    padding: 24,
  },
})

