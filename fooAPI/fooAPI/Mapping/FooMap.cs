using FluentNHibernate.Mapping;
using fooAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fooAPI.Mapping
{   
    public class FooMap : ClassMap<Foo>
    {
        public FooMap()
        {
            Id(x => x.Id);

            Map(x => x.Name);
            Map(x => x.Height);

        }
    }
}
