using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using FluentNHibernate.Cfg;
using fooAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NHibernate.Tool.hbm2ddl;

namespace fooAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FooController : ControllerBase
    {
        private readonly NHibernate.ISession _session;
        private readonly NHibernate.Cfg.Configuration _configuration;

        public FooController(NHibernate.ISession session, NHibernate.Cfg.Configuration configuration)
            : base()
        {
            _session = session;
            _configuration = (NHibernate.Cfg.Configuration) configuration;

           
        }
        // GET: api/Foo
        [HttpGet]
        public IEnumerable<Foo> Get()
        {
            return _session.CreateCriteria(typeof(Foo)).List<Foo>();            
        }

        // GET: api/Foo/5
        [HttpGet("{id}", Name = "Get")]
        public Foo Get(int id)
        {
            using (var transaction = _session.BeginTransaction())
            {
                return _session.Get<Foo>(id);
            }
            
        }

        // POST: api/Foo
        [HttpPost]
        public void Post([FromBody] Foo foo)
        {
            using (var transaction = _session.BeginTransaction())
            {             
                _session.Save(foo);

                transaction.Commit();
            }
        }

        // PUT: api/Foo/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Foo foo_update)
        {
            using (var transaction = _session.BeginTransaction())
            {
                var foo = _session.Get<Foo>(id);
                foo.Name = foo_update.Name;
                foo.Height = foo_update.Height;
                _session.Save(foo);
                transaction.Commit();
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var transaction = _session.BeginTransaction())
            {
                var foo = _session.Get<Foo>(id);                
                _session.Delete(foo);

                transaction.Commit();
            }
        }
    }
}
