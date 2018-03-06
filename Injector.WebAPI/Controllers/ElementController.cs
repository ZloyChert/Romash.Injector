using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Injector.Business.Abstract;
using Injector.Shared;

namespace Injector.WebAPI.Controllers
{
    public class ElementController : ApiController
    {
        private readonly IElementService _elementService;

        public ElementController(IElementService elementService)
        {
            _elementService = elementService;
        }

        [HttpGet]
        [Route("get/elements/{id}")]
        public List<Element> GetElementsByCategoryId(int id)
        {
            return _elementService.GetByCategoryId(id).ToList();
        }

        [Route("create/element")]
        public int CreateCategory([FromBody]Element query)
        {
            return _elementService.Insert(query);
        }

        [HttpDelete]
        [Route("delete/element/{id}")]
        public void DeleteElement(int id)
        {
            _elementService.Delete(id);
        }
    }
}
