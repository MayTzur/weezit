//v3
export const api_key = 'b306387c577add422568c903b1cbb052';
//v4
export const api_access_token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzA2Mzg3YzU3N2FkZDQyMjU2OGM5MDNiMWNiYjA1MiIsInN1YiI6IjVlOTk4ZGE3MDU4MjI0MDAxNWIwMWU4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.efxubTgBE8UALa0SasEaqNNMcLF7eRWwny0DUtMBKFw';
//endpoint
export const endpoint = 'https://api.themoviedb.org/3';

//query for ganer list - movie
export const ganers_query_movie = '/genre/movie/list?api_key=';
//query for ganer list - tv
export const ganers_query_tv = '/genre/tv/list?api_key=';
//get popular person
export const popular_person_query = '/person/popular?api_key=';
//Get the primary person details [by id!!!]
export const person_detail_query = '/person/{person_id}?api_key=';
//Get the most newly created person
export const newly_person_query = '/person/latest?api_key=';

//search celebrity detailes by name [format: firstName%20lastName] >> respons: 
const api_celebrityData = `https://api.themoviedb.org/3/search/person?api_key=b306387c577add422568c903b1cbb052&language=en-US&query=Gal%20Gadot`;
//`https://api.themoviedb.org/3/search/person?api_key=b306387c577add422568c903b1cbb052&language=en-US&query={name format like wiki title}`