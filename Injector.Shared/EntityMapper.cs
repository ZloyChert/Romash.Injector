using System.Reflection;

namespace Injector.Shared
{
    public static class EntityMapper
    {
        public static TOut MapToEntity<TIn, TOut>(this TIn entity) where TOut : new()
        {
            TOut newEntity = new TOut();
            newEntity.CopyFieldsFrom(entity);
            return newEntity;
        }

        public static void CopyFieldsFrom<TIn, TOut>(this TOut newEntity, TIn entity) where TOut : new()
        {
            PropertyInfo[] properties = typeof(TIn).GetProperties();
            foreach (var property in properties)
            {
                var inEntityValue = property.GetValue(entity);
                PropertyInfo outPropertyInfo = typeof(TOut).GetProperty(property.Name);
                if (outPropertyInfo == null)
                {
                    continue;
                }
                outPropertyInfo.SetValue(newEntity, inEntityValue);
            }
        }
    }
}
