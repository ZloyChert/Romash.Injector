using System.Collections.Generic;
using System.Linq;
using Injector.ORM;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Repository
{
    public class ElementRepository : IRepository<Element>
    {
        public int Insert(Element element)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var frameElement = dbContext.Set<Elements>().Add(new Elements
                {
                    Name = element.Name,
                    CategoryId = element.CategoryId,
                    HtmlElement = element.HtmlElement,
                });
                return frameElement.Id;
            }
        }

        public void Update(Element element)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var frameElement = dbContext.Set<Elements>().FirstOrDefault(n => n.Id == element.Id);
                if (frameElement != null)
                {
                    frameElement.Name = element.Name;
                    frameElement.CategoryId = element.CategoryId;
                    frameElement.HtmlElement = element.HtmlElement;
                }
            }
        }

        public void Delete(int id)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var frameElement = dbContext.Set<Elements>().FirstOrDefault(n => n.Id == id);
                if (frameElement != null)
                {
                    dbContext.Set<Elements>().Remove(frameElement);
                }
            }
        }

        public Element Get(int id)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var frameElement = dbContext.Set<Elements>().FirstOrDefault(n => n.Id == id);
                if (frameElement != null)
                {
                    return new Element
                    {
                        Id = frameElement.Id,
                        Name = frameElement.Name,
                        CategoryId = frameElement.CategoryId,
                        HtmlElement = frameElement.HtmlElement
                    };
                }
                return null;
            }
        }

        public IEnumerable<Element> GetAll()
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                return dbContext.Set<Elements>().Select(frameElement => new Element
                {
                    Id = frameElement.Id,
                    Name = frameElement.Name,
                    CategoryId = frameElement.CategoryId,
                    HtmlElement = frameElement.HtmlElement
                });
            }
        }
    }
}
