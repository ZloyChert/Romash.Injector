using System.Web;
using VkNet;
using VkNet.Enums.Filters;
using VkNet.Model.RequestParams;

namespace VkMessageService
{
    public class MessageServiceVk
    {
        private const ulong AppId = 3998121;
        private readonly string _login;
        private readonly string _password;

        public MessageServiceVk()
        {
 
        }

        public MessageServiceVk(string login, string password)
        {
            _login = login;
            _password = password;
        }

        public void SendByUrl(string url, string message)
        {
            var a = HttpUtility.ParseQueryString(url).Get("sel");
            if (long.TryParse(a, out var userId))
            {
                SendMessage(userId, message);
            }
        }
        public void SendMessage(long userId, string messageText)
        {
            var api = new VkApi();
            api.Authorize(new ApiAuthParams{
                ApplicationId = AppId,
                Login = _login,
                Password = _password,
                Settings = Settings.All,
            });

            MessagesSendParams message = new MessagesSendParams
            {
                UserId = userId,
                Message = messageText
            };

            api.Messages.Send(message);
        }
    }
}
