using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Injector.WebAPI.Controllers
{
    public class DocumentController : ApiController
    {
        private string htmlstr =
            "<span role=\"link\" aria-label=\"OTVETIT\" class=\"im-mess--reply _im_mess_reply\"></span>" +
            "<span role=\"link\" aria-label=\"VAZNOE SOOBJENIE\" class=\"im-mess--fav _im_mess_fav\" ></span>" +
            " </div> <div class=\"im-mess--check fl_l\" ></div> <div class=\"im-mess--text wall_module _im_log_body\" > " +
            "<div class=\"im_msg_text\"></div><div class=\"_im_msg_media612787\">" +
            "<div class=\"im_msg_media im_msg_media_sticker\" ><div class=\"im_sticker_row\" > " +
            "<a onmouseover=\"return Emoji.stickerOver(4431, this);\" onclick=\"return Emoji.clickSticker(142, this, event);\" > " +
            "<img height=\"128\" class=\"im_gift\" src=\"https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg\" ></a></div></div>" +
            "</div></div> <span tabindex=\"0\" role=\"link\" aria-label=\"VIDELIT\" class=\"blind_label im-mess--blind-select _im_mess_blind_label_select\">" +
            "</span> <span tabindex=\"0\" aria-label=\"VIDELENO\" class=\"blind_label im-mess--blind-selected\" ></span>" +
            " <span tabindex=\"0\" aria-label=\"NE PROCHITANO\" class=\"blind_label im-mess--blind-read\"></span>" +
            " <span class=\"im-mess--marker _im_mess_marker\"></span>";

        [HttpGet]
        [Route("GetInnerHtmlForText/{textHtml}")]
        public string GetInnerHtmlForText(string textHtml)
        {
            if(textHtml == "qq")
                return @"https://i.pinimg.com/736x/52/6e/f2/526ef21f3b62652f5872f032461fd8e8--king-arthur-witch-art.jpg";
            return "";
        }
    }
}
