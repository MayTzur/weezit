export function titleConverter(results){
   return results.map(res => {
       const split = res.name.split(' ');
       const arr = split.map(spl => {
           return spl.charAt(0).toUpperCase() + spl.substr(1);
       })
       const str = arr.toString();
           const title_format = str.replace(',','%20');
       return title_format;
   })
}
