using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WeezitServer.Models.DAL;

namespace WeezitServer.Models
{
    public class Question
    {
        int id;
        string question;
        string correct_answer;
        string[] incorrect_answers;

        public Question(){ }

        public Question(int id, string question, string correct_answer, string[] incorrect_answers)
        {
            this.id = id;
            this.question = question;
            this.correct_answer = correct_answer;
            this.incorrect_answers = incorrect_answers;
        }

        public List<Question> GetQuestions() // --- 
        {
            DBConnection db = new DBConnection();
            return db.GetQuestions();
        }
    }
}