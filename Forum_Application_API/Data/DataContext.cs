using Forum_Application_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Forum_Application_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //TABLES
        public DbSet<User> Users { get; set; }
        public DbSet<ForumThread> Threads { get; set; }

        public DbSet<Comment> Comments { get; set; }
        //public DbSet<ThreadOwner> ThreadOwners { get; set; }
        //public DbSet<CommentOwner> CommentOwners { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ForumThread>().HasOne(c => c.User).WithMany(u => u.Threads).HasForeignKey(c => c.UserId).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Comment>().HasOne(c => c.User).WithMany(u => u.Comments).HasForeignKey(c => c.UserId).OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Comment>().HasOne(c => c.Thread).WithMany(u => u.Comments).HasForeignKey(c => c.ThreadId).OnDelete(DeleteBehavior.NoAction);


            /*modelBuilder.Entity<ThreadOwner>().HasKey(to => new { to.ThreadId, to.UserId });
            modelBuilder.Entity<ThreadOwner>().HasOne(t => t.ForumThread).WithMany(to => to.ThreadOwners).HasForeignKey(c => c.ThreadId);
            modelBuilder.Entity<ThreadOwner>().HasOne(t => t.User).WithMany(to => to.ThreadOwners).HasForeignKey(c => c.UserId);

            modelBuilder.Entity<CommentOwner>().HasKey(to => new { to.CommentId, to.ThreadId });
            modelBuilder.Entity<CommentOwner>().HasKey(to => new { to.CommentId, to.UserId });
            modelBuilder.Entity<CommentOwner>().HasOne(t => t.Comment).WithMany(to => to.CommentOwners).HasForeignKey(c => c.CommentId);
            modelBuilder.Entity<CommentOwner>().HasOne(t => t.ForumThread).WithMany(to => to.CommentOwners).HasForeignKey(c => c.ThreadId);
            modelBuilder.Entity<CommentOwner>().HasOne(t => t.User).WithMany(to => to.CommentOwners).HasForeignKey(c => c.UserId);*/
        }

    }
}
