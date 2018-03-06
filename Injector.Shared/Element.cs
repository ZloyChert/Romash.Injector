namespace Injector.Shared
{
    public class Element : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string HtmlElement { get; set; }
        public string ElementGuid { get; set; }
    }
}
