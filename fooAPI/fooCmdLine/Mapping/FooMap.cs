using FluentNHibernate.Mapping;
using fooCmdLine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fooCmdLine
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
