using System.Collections.Generic;
using System.Linq;
using Injector.ORM;
using Injector.Repository.Abstract;
using Injector.Shared;

namespace Injector.Repository
{
    public class UserRepository : IRepository<User>
    {
        public int Insert(User element)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var user = dbContext.Set<Users>().Add(new Users
                {
                    Login = element.Login,
                    Password = element.Password,
                });
                return user.Id;
            }
        }

        public void Update(User element)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var user = dbContext.Set<Users>().FirstOrDefault(n => n.Id == element.Id);
                if (user != null)
                {
                    user.Login = element.Login;
                    user.Password = element.Password;
                }
            }
        }

        public void Delete(int id)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var user = dbContext.Set<Users>().FirstOrDefault(n => n.Id == id);
                if (user != null)
                {
                    dbContext.Set<Users>().Remove(user);
                }
            }
        }

        public User Get(int id)
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                var user = dbContext.Set<Users>().FirstOrDefault(n => n.Id == id);
                if (user != null)
                {
                    return new User
                    {
                        Id = user.Id,
                        Login = user.Login,
                        Password = user.Password
                    };
                }
                return null;
            }
        }

        public IEnumerable<User> GetAll()
        {
            using (InjectorDatabase dbContext = new InjectorDatabase())
            {
                return dbContext.Set<Users>().Select(user => new User
                {
                    Id = user.Id,
                    Login = user.Login,
                    Password = user.Password
                });
            }
        }
    }
}
