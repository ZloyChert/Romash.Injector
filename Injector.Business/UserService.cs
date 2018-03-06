using System.Collections.Generic;
using Injector.Business.Abstract;
using Injector.Repository;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Business
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _repository;

        public UserService(IRepository<User> repository)
        {
            _repository = repository;
        }
        public int Insert(User element) => _repository.Insert(element);

        public void Update(User element) => _repository.Update(element);

        public void Delete(int id) => _repository.Delete(id);

        public User Get(int id) => _repository.Get(id);

        public IEnumerable<User> GetAll() => _repository.GetAll();
    }
}
