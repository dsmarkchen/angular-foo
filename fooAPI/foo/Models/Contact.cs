using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace foo
{
    public class Contact
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
        public virtual string Email
        {
            get;
            set;
        }

        public virtual string Message
        {
            get;
            set;
        }

        public virtual DateTime DateTime
        {
            get;
            set;
        }

        


        public Contact()
        {
            
        }

        
    }
}
