using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace foo
{
    public class ContactMap : ClassMap<Contact>
    {
        public ContactMap()
        {
            Id(x => x.Id);

            Map(x => x.Name);
            Map(x => x.Email);
            Map(x => x.DateTime);
            Map(x => x.Message);

        }
    }
}
