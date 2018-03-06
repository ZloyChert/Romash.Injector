using System.Collections.Generic;
using Injector.Shared;

namespace Injector.Business.Abstract
{
    public interface IElementService: IService<Element>
    {
        IEnumerable<Element> GetByCategoryId(int id);
    }
}
