using Microsoft.AspNetCore.Identity;

namespace Forum_Application_API.Models
{
    public class User : IdentityUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<ForumThread> Threads { get; set; }
        public ICollection<Comment> Comments { get; set; }
        //public ICollection<ThreadOwner> ThreadOwners { get; set; }

        //public ICollection<CommentOwner> CommentOwners { get; set; }
    }
}
