using System.Collections.Generic;
using System.Linq;
using Injector.ORM;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Repository
{
    public class Repository<TDb, T>: IRepository<T> 
        where TDb : class, IEntity, new()
        where T: IEntity, new()
    {
        public int Insert(T element)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var entity = dbContext.Set<TDb>().Add(element.MapToEntity<T, TDb>());
                dbContext.SaveChanges();
                return entity.Id;
            }
        }

        public void Update(T element)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var entity = dbContext.Set<TDb>().FirstOrDefault(n => n.Id == element.Id);
                entity?.CopyFieldsFrom(element);
                dbContext.SaveChanges();
            }
        }

        public void Delete(int id)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var entity = dbContext.Set<TDb>().FirstOrDefault(n => n.Id == id);
                if (entity != null)
                {
                    dbContext.Set<TDb>().Remove(entity);
                    dbContext.SaveChanges();
                }
            }
        }

        public T Get(int id)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var entity = dbContext.Set<TDb>().FirstOrDefault(n => n.Id == id);
                if (entity != null)
                {
                    return entity.MapToEntity<TDb, T>();
                }
                return default(T);
            }
        }

        public IEnumerable<T> GetAll()
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                return dbContext.Set<TDb>().ToList().Select(entity => entity.MapToEntity<TDb, T>()).ToList();
            }
        }
    }
}
