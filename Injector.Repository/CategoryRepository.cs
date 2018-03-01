using System.Collections.Generic;
using System.Linq;
using Injector.ORM;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Repository
{
    public class CategoryRepository : IRepository<Category>
    {
        public int Insert(Category element)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var category = dbContext.Set<Categories>().Add(new Categories
                {
                    Name = element.Name,
                    CreatedUserId = element.UserId,
                    ImgSrc = element.ImgSrc
                });
                return category.Id;
            }
        }

        public void Update(Category element)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var category = dbContext.Set<Categories>().FirstOrDefault(n => n.Id == element.Id);
                if (category != null)
                {
                    category.Name = element.Name;
                    category.CreatedUserId = element.UserId;
                    category.ImgSrc = element.ImgSrc;
                }
            }
        }

        public void Delete(int id)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var category = dbContext.Set<Categories>().FirstOrDefault(n => n.Id == id);
                if (category != null)
                {
                    dbContext.Set<Categories>().Remove(category);
                }
            }
        }

        public Category Get(int id)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var category = dbContext.Set<Categories>().FirstOrDefault(n => n.Id == id);
                if (category != null)
                {
                    return new Category
                    {
                        Id = category.Id,
                        Name = category.Name,
                        UserId = category.CreatedUserId,
                        ImgSrc = category.ImgSrc
                    };
            }
                return null;
            }
        }

        public IEnumerable<Category> GetAll()
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                return dbContext.Set<Categories>().Select(category => new Category
                {
                    Id = category.Id,
                    Name = category.Name,
                    UserId = category.CreatedUserId,
                    ImgSrc = category.ImgSrc
                }).ToList();
            }
        }
    }
}
