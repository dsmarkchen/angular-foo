using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace foo
{
    public class Book
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
        public virtual string Author
        {
            get;
            set;
        }

        public virtual Foo Foo
        {
            get;
            set;
        }

    }

    public class BookCollection : ICollection<Book>
    {
        // The inner collection to store objects.
        private List<Book> innerCol;

        public BookCollection()
        {
            innerCol = new List<Book>();
        }


        public Book this[int index]
        {
            get { return (Book)innerCol[index]; }
            set { innerCol[index] = value; }
        }
        public void Add(Book item)
        {

            if (!Contains(item))
            {
                innerCol.Add(item);
            }
            
        }
        public IEnumerator<Book> GetEnumerator()
        {
            return (IEnumerator<Book>) innerCol ;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return (IEnumerator)innerCol;
        }

        public bool Contains(Book item, EqualityComparer<Book> comp)
        {
            bool found = false;

            foreach (Book bx in innerCol)
            {
                if (comp.Equals(bx, item))
                {
                    found = true;
                }
            }

            return found;
        }
        public bool Contains(Book item)
        {
            bool found = false;

            foreach (Book bx in innerCol)
            {
                if (bx.Equals(item))
                {
                    found = true;
                }
            }

            return found;
        }

        public int Count
        {
            get
            {
                return innerCol.Count;
            }
        }

        public bool IsReadOnly
        {
            get { return false; }
        }


        public void Clear()
        {
            innerCol.Clear();
        }

        public void CopyTo(Book[] array, int arrayIndex)
        {
            if (array == null)
                throw new ArgumentNullException("The array cannot be null.");
            if (arrayIndex < 0)
                throw new ArgumentOutOfRangeException("The starting array index cannot be negative.");
            if (Count > array.Length - arrayIndex + 1)
                throw new ArgumentException("The destination array has fewer elements than the collection.");

            for (int i = 0; i < innerCol.Count; i++)
            {
                array[i + arrayIndex] = innerCol[i];
            }
        }

        public bool Remove(Book item)
        {
            bool result = false;

            // Iterate the inner collection to 
            // find the box to be removed.
            for (int i = 0; i < innerCol.Count; i++)
            {

                Book curBook = (Book)innerCol[i];

                if (curBook.Name == item.Name && curBook.Author == item.Author)
                {
                    innerCol.RemoveAt(i);
                    result = true;
                    break;
                }
            }
            return result;
        }
    }

}
