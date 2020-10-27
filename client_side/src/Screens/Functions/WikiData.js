import React from 'react';

export function wikiData(data){
    return data.map(d => {
        console.log(d);
        let img;
        try{
            img = d.thumbnail.source;
        }
        catch (e) {
            console.error(e.message);
            img = 'no image';
          }

        return {
            'pageid': d.pageid,
            'title': d.title,
            'description': d.description,
            'image_src': img
        }
    })
}