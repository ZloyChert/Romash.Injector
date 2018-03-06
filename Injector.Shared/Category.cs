namespace Injector.Shared
{
    public class Category : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImgSrc { get; set; }
        public int UserId { get; set; }
    }
}
