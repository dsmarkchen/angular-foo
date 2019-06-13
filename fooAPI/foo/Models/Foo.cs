using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace foo
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

        public virtual DateTime DateTime
        {
            get;
            set;
        }

        public virtual ICollection<Book> Books
        {
            get;
            set;
        }


        public Foo()
        {
            Books = new BookCollection();
        }

        public virtual void AddBook(Book book)
        {
            book.Foo = this;
            Books.Add(book);
        }
    }

}
