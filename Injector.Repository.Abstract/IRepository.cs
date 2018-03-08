using System.Collections.Generic;

namespace Injector.Repository.Abstract
{
    public interface IRepository<T>
    {
        int Insert(T element);
        void Update(T element);
        void Delete(int id);
        T Get(int id);
        IEnumerable<T> GetAll();
    }
}
