using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Conventions.Helpers;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Context;
using NHibernate.Tool.hbm2ddl;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace fooCmdLine
{
    class Program
    {
        static void Main(string[] args)
        {
            ISession session = xSessionManager.GetCurrentSession();
            xSessionManager.ExportSchema();
            var run11 = new Foo { Id = 0, Name = "Foo", Height = 1.7f };
            var run12 = new Foo { Id = 0, Name = "Bar", Height = 1.5f };

            using (var transaction = session.BeginTransaction())
            {
                session.Save(run11);
                session.Save(run12);

                transaction.Commit();
            }

            var foos = session.CreateCriteria(typeof(Foo)).List<Foo>();
        }
    }

    class xSessionManager
    {
        private static readonly ISessionFactory sessionFactory;
        private static Configuration _configuration;
        private static string _db_filename = @"c:\tempsq\foo.sq3";

        static xSessionManager()
        {
            sessionFactory = CreateSessionFactory("default");
        }

        public static ISession GetCurrentSession()
        {
            if (CurrentSessionContext.HasBind(sessionFactory))
            {
                return sessionFactory.GetCurrentSession();
            }

            var session = sessionFactory.OpenSession();
            CurrentSessionContext.Bind(session);
            return session;
        }

        public static ISession Unbind()
        {
            return CurrentSessionContext.Unbind(sessionFactory);
        }


        private static ISessionFactory CreateSessionFactory(string jobname)
        {
            string db_fileName = _db_filename;
            return Fluently.Configure()
                     .Database(SQLiteConfiguration.Standard.UsingFile(db_fileName))
                     .Mappings(m =>
                     {
                         m.FluentMappings.Conventions.Setup(c => c.Add(AutoImport.Never()));
                         m.FluentMappings.Conventions.AddAssembly(Assembly.GetExecutingAssembly());
                         m.HbmMappings.AddFromAssembly(Assembly.GetExecutingAssembly());

                         var assembly = Assembly.Load("fooCmdLine");
                         m.FluentMappings.Conventions.AddAssembly(assembly);
                         m.FluentMappings.AddFromAssembly(assembly);
                         m.HbmMappings.AddFromAssembly(assembly);

                     })
                     .ExposeConfiguration(cfg =>
                     {
                         cfg.SetProperty("current_session_context_class", "thread_static");
                         _configuration = cfg;
                     })
                     .BuildSessionFactory();
        }
        public static void ExportSchema()
        {
            string pathDatabase = Path.GetDirectoryName(_db_filename);
            string pathName = Path.Combine(pathDatabase, @"initial.database");
            Utilities.CreateIfMissing(pathDatabase);
            Utilities.CreateIfMissing(pathName);
            var export = new SchemaExport(_configuration);
            string fileName = Path.Combine(pathDatabase, @"initial.database\create.objects.sql");

            using (var file = new FileStream(fileName, FileMode.Create, FileAccess.Write))
            {
                using (var sw = new StreamWriter(file))
                {
                    export.Execute(true, true, false, GetCurrentSession().Connection, sw);
                    sw.Close();
                }
            }
        }
    }
    public class Utilities
    {
        public static void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }

    }
}
