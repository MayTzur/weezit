using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace WeezitServer.Models
{
    public abstract class Person
    {
        public Person()
        {

        }

        public Person(int id, string name, string image)
        {
            Id = id;
            Name = name;
            Image = image;
        }

        public Person(int id)
        {
            Id = id;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }

        public abstract DataTable Get();
        public abstract int Insert();
    }
}