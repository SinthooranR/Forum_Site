namespace Forum_Application_API.Models
{
    public class ForumThread
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<Comment> Comments { get; set; }

        public User User { get; set; }

        public int UserId { get; set; }
    }
}
