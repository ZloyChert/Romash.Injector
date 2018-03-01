using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Injector.Business;
using Injector.Business.Abstract;
using Injector.Shared;
using Injector.WebAPI.Queries;

namespace Injector.WebAPI.Controllers
{
    public class DocumentController : ApiController
    {
        private readonly ICategoryService categoryService = new CategoryService();
        private int stubId = 1;

        [HttpGet]
        [Route("get/categories")]
        public List<Category> GetCategories()
        {
            return categoryService.GetAll().ToList();
        }

        [Route("create/category")]
        public int CreateCategory([FromBody]CategoryCreate query)
        {
            return categoryService.Insert(new Category
            {
                Name = query.Name,
                UserId = stubId
            });
        }
    }
}
