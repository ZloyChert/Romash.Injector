namespace Injector.Shared
{
    public class Category : IEntity
    {
        public int Id { get; set; }
        public int CreatedUserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImgSrc { get; set; }
    }
}
