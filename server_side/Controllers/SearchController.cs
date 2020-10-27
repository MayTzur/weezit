using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WeezitServer.Models;

namespace WeezitServer.Controllers
{
    [RoutePrefix("api/Search")]
    //[RoutePrefix("http://localhost:60021/api/Search")]
    public class SearchController : ApiController
    {
        Search search = new Search();

        //GET
        [Route("Facts")] //--- checked
        public IHttpActionResult GetFacts()
        {
            try
            {
                return Ok(search.GetFactsTbl());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /* [Route("MostPopular")] //- -- checked
         public IHttpActionResult GetMostPopular()
         {
             try
             {
                 return Ok(search.MostPOpularId());
             }
             catch (Exception e)
             {
                 return BadRequest(e.Message);
             }
         }*/

        [Route("GetSearch/{id}")] //get search - -- checked
        public IHttpActionResult Get(int id)
        {
            try
            {
                search.Id = id;
                return Ok(search.Get());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
