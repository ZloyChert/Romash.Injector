using System.Collections.Generic;
using Injector.Business.Abstract;
using Injector.Repository;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Business
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> repository = new CategoryRepository();

        public int Insert(Category element) => repository.Insert(element);

        public void Update(Category element) => repository.Update(element);

        public void Delete(int id) => repository.Delete(id);

        public Category Get(int id) => repository.Get(id);

        public IEnumerable<Category> GetAll() => repository.GetAll();
    }
}
