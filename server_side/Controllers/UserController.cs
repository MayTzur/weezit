using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WeezitServer.Models;

namespace WeezitServer.Controllers
{
    [RoutePrefix("api/User")]
    //[RoutePrefix("localhost:60021/api/User")]
    public class UserController : ApiController
    {
        User user = new User();

        //UPDATE
        [Route("UpdateProfile")]
        public IHttpActionResult PutUpdateProfile([FromBody]User user) // --- checked
        {
            try
            {
                user.UpdateProfile();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("UpdateToken")]
        public IHttpActionResult PutUpdateToken([FromBody]User user) // check the last date and update if necessary --- checked
        {
            try
            {
                user.UpdateToken();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("UpdateGameResult/{userId}/{mode}")]
        public IHttpActionResult PutUpdateGameResult(int userId, bool mode) // in the enf of game do this --- checked
        {
            try
            {
                user.Id = userId;
                return Ok(user.UpdateWins(mode));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //DELETE
        [Route("DeleteAllUserSearch/{userId}")]
        public IHttpActionResult DeleteAllUserSearch(int userId) // delete ALL user searchs --- checked
        {
            try
            {
                user.Id = userId;
                user.DeleteAllSearchs();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteUserSearch/{userId}/{searchId}")]
        public IHttpActionResult DeleteUserSearch(int userId, int searchId) // delete specific user search --- checked
        {
            try
            {
                user.Id = userId;
                user.DeleteUserSearch(searchId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteUser/{id}")]
        public IHttpActionResult DeleteUser(int id) // delete this user --- checked
        {
            try
            {
                user.Id = id;
                user.DeleteUser();              
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //INSERT
        [Route("InsertUserSearch/{id}")]
        public IHttpActionResult PostUserSearch(int id, [FromBody]Search search) // insert user to db and return the id --- checked
        {
            try
            {
                user.Id = id;
                user.InsertUserSearch(search);             
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("Insert/{token}")]
        public IHttpActionResult Post(string token) // insert user to db and return the id --- checked
        {
            try
            {
                user.Token = token;
                //int id = user.Insert(token);              
                return Ok(user.Insert());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        //GET
        [Route("Leaders")] //get 4 leaders - -- checked
        public IHttpActionResult GetLeaders()
        {
            try
            {
                return Ok(user.GetLeaders());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("SearchsList/{id}")] //get user searchs tbl - -- checked
        public IHttpActionResult GetSearchsList(int id)
        {
            try
            {
                user.Id = id;
                return Ok(user.GetAllSearches());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Wins/{id}")] //get user wins --- checked
        public IHttpActionResult GetWins(int id)
        {
            try
            {
                user.Id = id;
                return Ok(user.GetWins());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Coins/{id}")] //get user coins - -- checked
        public IHttpActionResult GetCoins(int id)
        {
            try
            {
                user.Id = id;
                return Ok(user.GetCoins());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Profile/{id}")] //get user profile --- checked
        public IHttpActionResult GetProfile(int id)
        {
            try
            {
                user.Id = id;
                return Ok(user.Get());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Route("Player/{id}")] //get user profile game --- checked
        public IHttpActionResult GetPlayer(int id)
        {
            try
            {
                user.Id = id;
                return Ok(user.GetPlayer());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
