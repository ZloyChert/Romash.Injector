using System.Collections.Generic;

namespace Injector.Business.Abstract
{
    public interface IService<T>
    {
        int Insert(T element);
        void Update(T element);
        void Delete(int id);
        T Get(int id);
        IEnumerable<T> GetAll();
    }
}
