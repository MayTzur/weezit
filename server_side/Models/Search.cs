using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using WeezitServer.Models.DAL;

namespace WeezitServer.Models
{
    public class Search: Person
    {
        public Search(){ }

        public Search(string biography, string name, int id, string image) : base(id, name, image)
        {
            Biography = biography;
        }

        //public Search(string name, int id, string image) : base(id, name, image) { }

        public string Biography { get; set; }
        static DBConnection db = new DBConnection();

        public override DataTable Get() //get current search --- checked
        {
            //procedure GetSearch
            return db.GetSearch(Id);
        }

        public override int Insert() //insert new search --- checked
        {
            //procedure InsertSearch
            return db.InsertSearch(this);
        }

        public DataTable GetFactsTbl() // --- checked
        {
            try
            {
                DataSet ds = db.GetFactsData();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    //if there is data in user search tbl
                    string name = (ds.Tables[0].Rows[0]["Name"]).ToString();

                    int rowsNum = ds.Tables[0].Rows.Count;
                    ds.Tables[1].Rows.Add(rowsNum + 1, $"{name} is the most popular search!");
                }
                return ds.Tables[1];
            }
            catch (Exception e)
            {
                throw e;
            }           
        }
        
    }
}