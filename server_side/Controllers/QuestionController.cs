using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WeezitServer.Models;

namespace WeezitServer.Controllers
{
    [RoutePrefix("api/Question")]
    public class QuestionController : ApiController
    {
        //GET
        [Route("List")] //--- checked
        public IHttpActionResult GetQuestions()
        {
            try
            {
                Question q = new Question();
                return Ok(q.GetQuestions());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}