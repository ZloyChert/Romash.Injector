using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Injector.Business.Abstract;
using Injector.Shared;
using Injector.WebAPI.Models;
using VkMessageService;

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

        [HttpGet]
        [Route("get/html/{guid}")]
        public string GetElementHtml(string guid)
        {
            return _elementService.GetByGuid(guid)?.HtmlElement;
        }

        [HttpPost]
        [Route("send")]
        public void SendMessage([FromBody]SendMessageQuery query)
        {
            MessageServiceVk vkService = new MessageServiceVk();
            vkService.SendByUrl(query.Url, $"elementcustom{query.Guid}");
        }
    }
}
