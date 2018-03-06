namespace Injector.Shared
{
    public class User : IEntity
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public byte[] Password { get; set; }
    }
}
