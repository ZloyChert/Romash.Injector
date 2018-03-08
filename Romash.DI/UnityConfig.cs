using System;
using Injector.Business;
using Injector.Business.Abstract;
using Injector.ORM;
using Injector.Repository;
using Injector.Repository.Abstract;
using Injector.Shared;
using Unity;
using Unity.Lifetime;

namespace Romash.DI
{
    public class UnityConfig
    {
        #region Unity Container
        private static readonly Lazy<IUnityContainer> ContainerCurrent = new Lazy<IUnityContainer>(() =>
        {
            var container = new UnityContainer();
            RegisterTypes(container);
            return container;
        });

        public static IUnityContainer Container => ContainerCurrent.Value;
        #endregion

        public static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType(typeof(IRepository<Element>), typeof(Repository<Elements, Element>), new HierarchicalLifetimeManager());
            container.RegisterType(typeof(IRepository<Category>), typeof(Repository<Categories, Category>), new HierarchicalLifetimeManager());
            container.RegisterType(typeof(IRepository<User>), typeof(Repository<Users, User>), new HierarchicalLifetimeManager());
            container.RegisterType(typeof(ICategoryService), typeof(CategoryService), new HierarchicalLifetimeManager());
            container.RegisterType(typeof(IElementService), typeof(ElementService), new HierarchicalLifetimeManager());
        }
    }
}
