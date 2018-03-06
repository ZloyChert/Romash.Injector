using Romash.DI;
using System.Web.Http;

using Unity.AspNet.WebApi;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(Injector.WebAPI.UnityWebApiActivator), nameof(Injector.WebAPI.UnityWebApiActivator.Start))]
[assembly: WebActivatorEx.ApplicationShutdownMethod(typeof(Injector.WebAPI.UnityWebApiActivator), nameof(Injector.WebAPI.UnityWebApiActivator.Shutdown))]

namespace Injector.WebAPI
{
    public static class UnityWebApiActivator
    {
        public static void Start() 
        {
            var resolver = new UnityDependencyResolver(UnityConfig.Container);

            GlobalConfiguration.Configuration.DependencyResolver = resolver;
        }

        public static void Shutdown()
        {
            UnityConfig.Container.Dispose();
        }
    }
}