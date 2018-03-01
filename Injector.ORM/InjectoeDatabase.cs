namespace Injector.ORM
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class InjectoeDatabase : DbContext
    {
        public InjectoeDatabase()
            : base("name=InjectoeDatabase")
        {
        }

        public virtual DbSet<Categories> Categories { get; set; }
        public virtual DbSet<Elements> Elements { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<UserCategory> UserCategory { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Categories>()
                .Property(e => e.Description)
                .IsUnicode(false);

            modelBuilder.Entity<Categories>()
                .Property(e => e.ImgSrc)
                .IsUnicode(false);

            modelBuilder.Entity<Categories>()
                .HasMany(e => e.UserCategory)
                .WithRequired(e => e.Categories)
                .HasForeignKey(e => e.CategoryId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Categories>()
                .HasMany(e => e.Elements)
                .WithRequired(e => e.Categories)
                .HasForeignKey(e => e.CategoryId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Elements>()
                .Property(e => e.ElementGuid)
                .IsUnicode(false);

            modelBuilder.Entity<Elements>()
                .Property(e => e.HtmlElement)
                .IsUnicode(false);

            modelBuilder.Entity<Elements>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Roles>()
                .Property(e => e.Name)
                .IsUnicode(false);

            modelBuilder.Entity<Roles>()
                .HasMany(e => e.UserRole)
                .WithRequired(e => e.Roles)
                .HasForeignKey(e => e.RoleId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Users>()
                .Property(e => e.Login)
                .IsUnicode(false);

            modelBuilder.Entity<Users>()
                .HasMany(e => e.Categories)
                .WithRequired(e => e.Users)
                .HasForeignKey(e => e.CreatedUserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Users>()
                .HasMany(e => e.UserCategory)
                .WithRequired(e => e.Users)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Users>()
                .HasMany(e => e.UserRole)
                .WithRequired(e => e.Users)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);
        }
    }
}
