import Clarifai from 'clarifai';
process.nextTick = setImmediate;
const app = new Clarifai.App({
    apiKey: '493b910b7d0840e393cc5e13ffd6f66a'
  });

export function goClarifai(base64){
return app.models.predict(Clarifai.CELEBRITY_MODEL,
  {base64: base64}, { maxConcepts: 3 }).then(
    function(response) {
      const res = response.outputs[0].data.regions[0].data.concepts;
     return res;
    },
    function (err) {
      console.log('Response Error: ' + err);
      return null;
    }
  );
}
