using System.Collections.Generic;
using Injector.Business.Abstract;
using Injector.Repository;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Business
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> repository = new UserRepository();

        public int Insert(User element) => repository.Insert(element);

        public void Update(User element) => repository.Update(element);

        public void Delete(int id) => repository.Delete(id);

        public User Get(int id) => repository.Get(id);

        public IEnumerable<User> GetAll() => repository.GetAll();
    }
}
