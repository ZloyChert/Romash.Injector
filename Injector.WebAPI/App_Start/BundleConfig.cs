using System.Web.Optimization;

namespace Injector.WebAPI
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js").Include(
                "~/extension/js/injection.js"));
        }
    }
}