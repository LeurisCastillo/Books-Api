using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LibraryServiceAPI.Models
{
    public class Book
    {

        public class Rootobject
        {
            public int id { get; set; }
            public string title { get; set; }
            public string description { get; set; }
            public int pageCount { get; set; }
        }

    }
}
