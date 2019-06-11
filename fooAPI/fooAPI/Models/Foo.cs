using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fooAPI.Models
{
    public class Foo
    {
        public virtual int Id
        {
            get;
            set;
        }
        public virtual string Name
        {
            get;
            set;
        }
        public virtual float Height
        {
            get;
            set;
        }
    }
}
