import {firebase, db} from '../Screens/Game/Firebase';
import { gameState, userState } from '../functions/player';
let ref = db.ref('/games');

export const Joining = async (currentKey, user) => {
    console.log('*** Joining function ***');
    try{
        let result = '';
        await ref.child(currentKey)
        .transaction(function(game){
            console.log('-transaction-');
            if (game === null || game.state !== gameState.waiting) {//to keep on two players in game
                return game;
            } else if(!game.joiner){
                game.state = gameState.close,
                game.joiner = { id: user.ID, username: user.UserName, image: user.Image, correctAns: 0, userState: userState.noComment };                   
            } 
            return game;
        }).then((val) =>{
            console.log('val=', val);
            result = val.committed;
        })
        return result;
    }
    catch(err){
        console.log('join a game was failed with error=', err);
    }
}
