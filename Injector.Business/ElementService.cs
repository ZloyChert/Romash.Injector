using System;
using System.Collections.Generic;
using System.Linq;
using Injector.Business.Abstract;
using Injector.Repository;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Business
{
    public class ElementService : IElementService
    {
        private readonly IRepository<Element> _repository;

        public ElementService(IRepository<Element> repository)
        {
            _repository = repository;
        }

        public int Insert(Element element)
        {
            element.ElementGuid = Guid.NewGuid().ToString();
            return _repository.Insert(element);
        }

        public void Update(Element element) => _repository.Update(element);

        public void Delete(int id) => _repository.Delete(id);

        public Element Get(int id) => _repository.Get(id);

        public IEnumerable<Element> GetAll() => _repository.GetAll();

        public IEnumerable<Element> GetByCategoryId(int id)=> _repository.GetAll().Where(n => n.CategoryId == id);

        public Element GetByGuid(string guid) => _repository.GetAll().FirstOrDefault(n => n.ElementGuid == guid);
    }
}
