import React from 'react';

export function titleConverter(results){
   return results.map(res => {
       //return titleFormat(res.name);
       const split = res.name.split(' ');
       const arr = split.map(spl => {
           return spl.charAt(0).toUpperCase() + spl.substr(1);
       })
       const str = arr.toString();
           console.log('to string array: '+str);
           const title_format = str.replace(',','%20');
           console.log('to replace: '+title_format);
       return title_format;
   })
}