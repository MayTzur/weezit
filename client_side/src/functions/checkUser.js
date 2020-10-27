import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
//import TokenPermission  from '../TokenPermission';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const TokenPermissions = async () => {
    try{
        const { status: existingStatus } = await Permissions.getAsync( Permissions.NOTIFICATIONS );
        let finalStatus = existingStatus;
    
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
    
        if (finalStatus !== 'granted') { return }
        let token = await Notifications.getExpoPushTokenAsync();  
        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('chat-messages', {
              name: 'Messages',             
              priority: 'max',
              sound: true,
              vibrate: [0, 250, 250, 250],
            });
          }
             
        return ( token );
    }
    catch (err){
        console.log('Token Error=', err);
    }
}

export const updateToken = async (userId) => {
    console.log('updateToken function:');
    try{
        const token = await TokenPermissions();
        const path = `http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/User/UpdateToken`;
        
        const user = {
            Id: userId,
            Token: token
        }
        const result = await fetch(path, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        })
        return result.ok;
    }
    catch(err){
        console.log('updateToken error=', err)
        return false;
    }
}

export const createUser = async () => {
    console.log('createUser function:')
    try{
        //const token = await TokenPermissions();
        const token = await TokenPermissions();
        //
        console.log('token=', token);           
        const path = `http://proj.ruppin.ac.il/bgroup8/prod/serverSide/api/User/Insert/${token}`;
        //console.log('path=', path);
        fetch(path, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }).then(res => {
            //console.log('res=', res)
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
            })
            .then( data => {
                console.log('data=', data)
                AsyncStorage.setItem('id', JSON.stringify(data))                
            })
            
    }
    catch(err){
        console.log('createUser error=', err)
        return false;
    }	
}

export const getData = async () => {
    console.log('getData from storage:');
    try {
      const jsonValue = await AsyncStorage.getItem('id')
      //console.log('jsonValue=', jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
}