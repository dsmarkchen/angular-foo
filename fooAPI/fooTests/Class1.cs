using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Conventions.Helpers;
using foo;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace fooTests
{
    [TestFixture]
    public class SimpleTests
    {
        [Test]
        public void test1()
        {
            int i = 0;
            Assert.That(i, Is.EqualTo(0));
        }
    }
    [TestFixture]
    public class FooTests
    {
        InMemorySqLiteSessionFactory sqliteSessionFactory;

        [SetUp]
        public void init()
        {
            sqliteSessionFactory = new InMemorySqLiteSessionFactory();
        }
        [TearDown]
        public void free()
        {
            sqliteSessionFactory.Dispose();
        }

        [Test]
        public void test1()
        {
            int i = 1;
            Foo foo = new Foo() { Name = "foo", Height = 1, DateTime = DateTime.Now };

            using (ISession session = sqliteSessionFactory.Session)
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    Assert.That(foo.Id == 0);

                    session.SaveOrUpdate(foo);

                    transaction.Commit();

                    Assert.That(foo.Id > 0);
                }

            }
        }

        [Test]
        public void test2()
        {
            int i = 1;
            Foo foo = new Foo() { Name = "foo", Height = 1, DateTime = DateTime.Now };

            using (ISession session = sqliteSessionFactory.Session)
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    session.SaveOrUpdate(foo);

                    transaction.Commit();
                    Assert.That(foo.Id > 0);
                }

                 var foos = session.CreateCriteria(typeof(Foo)).List<Foo>();
                Assert.That(foos.Count, Is.EqualTo(1));
            }
        }

        [Test]
        public void test3()
        {
            int i = 1;
            Foo foo = new Foo() { Name = "foo", Height = 1, DateTime = DateTime.Now };
            Book book = new Book { Name = "a", Author = "a" };

            using (ISession session = sqliteSessionFactory.Session)
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    foo.AddBook(book);
                    session.SaveOrUpdate(foo);

                    transaction.Commit();
                    Assert.That(foo.Id > 0);
                }

                var foos = session.CreateCriteria(typeof(Foo)).List<Foo>();
                
                Assert.That(foos.Count, Is.EqualTo(1));
                Assert.That(foos[0].Books.Count, Is.EqualTo(1));

            }
        }
        [Test]
        public void test4()
        {
            int i = 1;
            Foo foo = new Foo() { Name = "foo", Height = 1, DateTime = DateTime.Now };
            Book book = new Book { Name = "a", Author = "a" };
            Book book2 = new Book { Name = "b", Author = "a" };
            Book book3 = new Book { Name = "c", Author = "c" };

            using (ISession session = sqliteSessionFactory.Session)
            {
                using (ITransaction transaction = session.BeginTransaction())
                {
                    foo.AddBook(book);
                    foo.AddBook(book2);
                    foo.AddBook(book3);
                    session.SaveOrUpdate(foo);

                    transaction.Commit();
                    Assert.That(foo.Id > 0);
                }

                var foos = session.CreateCriteria(typeof(Foo)).List<Foo>();

                Assert.That(foos.Count, Is.EqualTo(1));
                Assert.That(foos[0].Books.Count, Is.EqualTo(3));
                foreach(Book b in foos[0].Books)
                {
                    Console.WriteLine(b.Name + " " + b.Author);
                }

            }
        }
    }

    public class InMemorySqLiteSessionFactory : IDisposable
    {
        private Configuration _configuration;
        private ISessionFactory _sessionFactory;

        public ISession Session { get; set; }

        public InMemorySqLiteSessionFactory()
        {
            _sessionFactory = CreateSessionFactory();
            Session = _sessionFactory.OpenSession();
            ExportSchema();
        }
        public ISession reopen()
        {
            return _sessionFactory.OpenSession();
        }
        private void ExportSchema()
        {
            var export = new SchemaExport(_configuration);

            using (var file = new FileStream(@"c:\temp\create.objects.sql", FileMode.Create, FileAccess.Write))
            {
                using (var sw = new StreamWriter(file))
                {
                    export.Execute(true, true, false, Session.Connection, sw);
                    sw.Close();
                }
            }
        }

        private ISessionFactory CreateSessionFactory()
        {
            return Fluently.Configure()
                     .Database(SQLiteConfiguration.Standard.InMemory().ShowSql())
                     .Mappings(m =>
                     {
                         m.FluentMappings.Conventions.Setup(c => c.Add(AutoImport.Never()));
                         m.FluentMappings.Conventions.AddAssembly(Assembly.GetExecutingAssembly());
                         m.HbmMappings.AddFromAssembly(Assembly.GetExecutingAssembly());

                         var assembly = Assembly.Load("foo");
                         m.FluentMappings.Conventions.AddAssembly(assembly);
                         m.FluentMappings.AddFromAssembly(assembly);
                         m.HbmMappings.AddFromAssembly(assembly);

                     })
                     .ExposeConfiguration(cfg => _configuration = cfg)
                     .BuildSessionFactory();
        }

        public void Dispose()
        {
            Session.Dispose();
            _sessionFactory.Close();
        }
    }
}
