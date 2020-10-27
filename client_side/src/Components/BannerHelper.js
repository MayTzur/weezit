import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Banner } from 'react-native-paper';
const { width, height } = Dimensions.get('screen');


export class Helper {
    static banner;
    static onClose;
  
    static setBanner(banner) {
        console.log('banner=', banner);
      this.banner = banner;
    }
  
    static show(visible) {
        //console.log('this.dropDown=', this.dropDown);
      if (this.banner) {
        this.banner.show(visible);
      }
    }
  
    static setOnClose(onClose) {
      this.onClose = onClose;
    }
  
    static invokeOnClose() {
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
}

export const GetBanner = (props) => {
    console.log('props=', props);
   // const [visible, setVisible] = React.useState(props.visible);
    //const hideModal = () => setVisible(false);

    if(props.visible){
        return (
            <View style={styles.container}>
                <Banner visible={true}
                ref={ref => Helper.setBanner(ref)}            
                    contentStyle={styles.content}
                    actions={[
            {
              label: 'Confirm game!',
              onPress: () => {this.props.onPress('confirm')},
            },
            {
              label: 'Reject game',
              onPress: () => {this.props.onPress('reject')},
            },
          ]}
          icon={({size}) => (
            <Image
              source={{
                uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
              }}
              style={{
                width: size,
                height: size,
              }}
            />
          )}>
          There was a problem processing a transaction on your credit card.
        </Banner>
        </View>
        )
    }
    return null;
}
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //width: width / 1.5,
        //top: 0,
        height: height / 6,
        //flex: 1,
        //flex: 1,
        //position: 'absolute',
        //flexWrap: 'wrap',
        //justifyContent: 'center',
        //alignItems: 'center',
        //textAlign: 'auto',
        //paddingVertical: 20,
        //zIndex:20,
        //color: 'black'
    },
    banner: {
        height: height / 6,
        flex: 1,
      //position: 'absolute',
      flexWrap: 'wrap',
      //position: 'absolute',
    },
    content: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
    },
})

