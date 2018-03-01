using System.Collections.Generic;
using Injector.Business.Abstract;
using Injector.Repository;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Business
{
    public class ElementService : IElementService
    {
        private readonly IRepository<Element> repository = new ElementRepository();

        public int Insert(Element element) => repository.Insert(element);

        public void Update(Element element) => repository.Update(element);

        public void Delete(int id) => repository.Delete(id);

        public Element Get(int id) => repository.Get(id);

        public IEnumerable<Element> GetAll() => repository.GetAll();
    }
}
