import React from 'react';
import { Container } from 'native-base';

const getBiography = async (personId) => { 
    const biography_api = `https://api.themoviedb.org/3/person/${personId}/translations?api_key=b306387c577add422568c903b1cbb052&language=en-US&query=Mark%20Salling&language=en-US`;
    let request = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        })
    }
    try {
        const response = await fetch(biography_api, request);
        const res = await response.json();
        let biography;
        res.translations.map(trans => {
            if(trans.name == 'English'){
                biography = trans.data.biography
            }
        })
        return biography;
    }
    catch (err) {
        return err;
    }
}

const Card = props => (
    <Container style={{ elevation: 10 }}>
      <Cover>
        <Image source={props.image} />
        <Title>{props.title}</Title>
      </Cover>
      <Content>
        <Logo source={props.logo} />
        <Wrapper>
          <Caption>{props.caption}</Caption>
          <Subtitle>{props.subtitle.toUpperCase()}</Subtitle>
        </Wrapper>
      </Content>
    </Container>
  );


export { getBiography };



