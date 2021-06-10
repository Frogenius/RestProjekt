using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestProjekt.Models
{
    public class Food
    {
        public int Id { get; set; }

        public bool InStock { get; set; }

        public string Name { get; set; }

        public string Przepis { get; set; }

    }
}
