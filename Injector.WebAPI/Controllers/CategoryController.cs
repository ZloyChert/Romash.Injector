using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Injector.Business.Abstract;
using Injector.Shared;

namespace Injector.WebAPI.Controllers
{
    public class CategoryController : ApiController
    {
        private readonly ICategoryService _categoryService;
        private int stubId = 1;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        [Route("get/categories")]
        public List<Category> GetCategories()
        {
            return _categoryService.GetAll().ToList();
        }

        [Route("create/category")]
        public int CreateCategory([FromBody]Category query)
        {
            query.CreatedUserId = stubId;
            return _categoryService.Insert(query);
        }

        [HttpPut]
        [Route("activate/category")]
        public void ActivateCategory([FromBody] int id)
        {
            _categoryService.ActivateCategory(id);
        }

        [HttpPut]
        [Route("disactivate/category")]
        public void DisactivateCategory([FromBody] int id)
        {
            _categoryService.DisactivateCategory(id);
        }

        [HttpDelete]
        [Route("delete/category/{id}")]
        public void DelteteCategory(int id)
        {
            _categoryService.Delete(id);
        }
    }
}
