using Injector.Shared;

namespace Injector.ORM
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Elements : IEntity
    {
        public int Id { get; set; }

        [Required]
        [StringLength(40)]
        public string ElementGuid { get; set; }

        public int CategoryId { get; set; }

        [Required]
        public string HtmlElement { get; set; }

        [Required]
        [StringLength(30)]
        public string Name { get; set; }

        public virtual Categories Categories { get; set; }
    }
}
