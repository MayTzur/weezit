import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { db} from '../Screens/Game/Firebase';
const { width, height } = Dimensions.get('screen');
import { Tile } from 'react-native-elements';

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const GameOver = (props) => {
    if(props.isWon){
        return(
            <Tile
                imageSrc={require('../Background/big-win-surprise-banner-comic-style/17792.jpg')}
                icon={{ name: 'play-circle', type: 'font-awesome' }}
                featured
            />
        )
    }
}

export const gameState = { 
    waiting: 1, 
    run: 2, 
    over: 3,
    close: 4,
    ready: 5
} 

export const userState = { 
    wrong: 5, 
    await: 6, 
    right: 7, 
    out: 8,
    confirmed: 9,
    noComment: 10,
    rejected: 11,
    remove: 12,
    in: 13
}



export const ifWon = (c_correct, j_correct, isCreator) => {
    console.log('*** ifWon ***')
    if( c_correct > j_correct){
        if(isCreator){
            return true;
        }else {
            return false;
        }
    } else if( c_correct < j_correct){
        if(isCreator){
            return false;
        }else {
            return true;
        }
    } else {
        return true;
    }
}

export const gameResult = (id, mode) => {
    console.log('*** gameResult ***')
    try{
        const path = 'http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/User/UpdateGameResult/' + id + '/' + mode;
        fetch(path, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }).then(res => {
            if(!res.ok){
                console.log('can not save this game result');
            }
        })
    }
    catch(err){
        console.log('can not save this game result with error=', err);
    }
}

export const deleteGame = (gameKey) => {
    db.ref('/games/' + gameKey)
    .remove()
    .then(function() {
        console.log("Remove succeeded.")
    })
    .catch(function(error) {
        console.log("Remove failed: " + error.message)
    });
}

export const correctEmoji = [
    ':smirk:',
    ':grinning:',
    ':grin:',
    ':smiling:',
    ':smile:',
    'smiling face with halo',
    ':wink:',
    ':yum:',
    ':relieved:',
    ':heart_eyes:',
    ':sunglasses:',
    ':stuck_out_tongue:',
    ':stuck_out_tongue_winking_eye:',
    ':slightly_smiling_face:',
    ':upside_down_face:',
    ':money_mouth_face:',
    ':nerd_face:',
    ':hugging_face:',
    ':zany_face:',
    ':star-struck:',
    ':face_with_cowboy_hat:',
    ':face_with_hand_over_mouth:',
    ':partying_face:',
]

export const mistakeEmoji = [
    ':neutral_face:',
    ':expressionless:',
    ':unamused:',
    ':sweat:',
    ':pensive:',
    ':confused:',
    ':confounded:',
    ':disappointed:',
    ':worried:',
    ':angry:',
    ':rage:',
    ':cry:',
    ':persevere:',
    ':triumph:',
    ':disappointed_relieved:',
    ':frowning:',
    ':anguished:',
    ':weary:',
    ':tired_face:',
    ':sob:',
    ':hushed:',
    ':cold_sweat:',
    ':open_mouth:',
    ':astonished:',
    ':flushed:',
    ':dizzy_face:',
    ':no_mouth:',
    ':face_with_rolling_eyes:',
    ':slightly_frowning_face:',
    ':face_with_symbols_on_mouth:',
    ':woozy_face:',
    ':pleading_face:',
]

styles = StyleSheet.create({
    Container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
    },
    options: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    option: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    animation: {
      padding: 10,
      height: height/3,
      width: width/1.2,
    },
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
  
  })

