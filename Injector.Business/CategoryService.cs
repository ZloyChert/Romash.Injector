using System.Collections.Generic;
using Injector.Business.Abstract;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Business
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _repository;

        public CategoryService(IRepository<Category> repository)
        {
            _repository = repository;
        }

        public int Insert(Category element) => _repository.Insert(element);

        public void Update(Category element) => _repository.Update(element);

        public void Delete(int id) => _repository.Delete(id);

        public Category Get(int id) => _repository.Get(id);

        public IEnumerable<Category> GetAll() => _repository.GetAll();
        public void ActivateCategory(int id)
        {
            var category = _repository.Get(id);
            //category.IsActive = true;
            _repository.Update(category);
        }
        public void DisactivateCategory(int id)
        {
            var category = _repository.Get(id);
            //category.IsActive = false;
            _repository.Update(category);
        }
    }
}
