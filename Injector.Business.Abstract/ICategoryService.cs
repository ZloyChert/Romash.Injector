using Injector.Shared;

namespace Injector.Business.Abstract
{
    public interface ICategoryService : IService<Category>
    {
        void ActivateCategory(int id);
        void DisactivateCategory(int id);
    }
}
