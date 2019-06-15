using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using foo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace fooAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly NHibernate.ISession _session;
        public ContactController(NHibernate.ISession session)
           : base()
        {
            _session = session;
            
        }
        // GET: api/Contact
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _session.CreateCriteria(typeof(Contact)).List<Contact>();
        }

        // GET: api/Contact/5
        [HttpGet("{id}", Name = "GetContactus")]
        public Contact Get(int id)
        {
            return new Contact (){ };
        }

        // POST: api/Contact
        [HttpPost]
        public void Post([FromBody] Contact contactUs)
        {
            using (var transaction = _session.BeginTransaction())
            {
                _session.Save(contactUs);

                transaction.Commit();
            }
        }

        // PUT: api/Contact/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Contact value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
