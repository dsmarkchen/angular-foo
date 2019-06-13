using FluentNHibernate.Mapping;
using foo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace foo
{   
    public class FooMap : ClassMap<Foo>
    {
        public FooMap()
        {
            Id(x => x.Id);

            Map(x => x.Name);
            Map(x => x.Height);
            Map(x => x.DateTime);

            HasMany(x => x.Books)
               .Inverse()
               .Cascade.AllDeleteOrphan();
        }
    }
}
