import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Banner } from 'react-native-paper';
const { height } = Dimensions.get('screen');


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
        height: height / 6,
    },
    banner: {
      height: height / 6,
      lex: 1,
      flexWrap: 'wrap',
    },
    content: {
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
    },
})

