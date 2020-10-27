import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';
import { getData } from '../functions/checkUser';
import { Avatar } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const ReadUserData = async (api) => {
    try{
        const id = await getData();
        const path = 'http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/User/' + api + id;
        const response = await fetch(path, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        })
        console.log('response=', response);
        const res = await Promise.resolve(response.json());
        return res[0];
    }
    catch(err){
        console.log('ERROR: can not read user data=', err);
        return null;
    }
}

export const ChangeProfile = async (user) => { // ---
    console.log('UpdateProfile function:');
    const path = 'http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/User/UpdateProfile';
    try{
        let response = await fetch(path, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        });
        return response.status;
    }
    catch(err){
        console.log('err=', err)
    }
}

export const User = (props) => {
    const {user} = props;
    return(
        <View style={styles.container}>
            <Headline style={styles.head}>weezit</Headline>
            <View style={styles.user}>
            <Button
                type="clear"
                icon={
                    <MaterialCommunityIcons name="account-edit" size={24} color="black" />
                }
                title={user.UserName}
                onPress={props.onPress}
            />
            <Avatar
            size="large"
            overlayContainerStyle={{backgroundColor: 'blue'}}
            rounded
            source={{
                uri:
                user.Image,
            }}
            />
            </View>           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
        padding: 15,
    },
    head: {
        color: '#393f4d', 
        fontSize: 40, 
    },
    img: {
        alignItems: 'center',
        marginTop: 20,
    },
    user: {
        alignItems: 'center',
        flexDirection: 'row',    
        alignSelf: 'flex-end',   
    },
})
