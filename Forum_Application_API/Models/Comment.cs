namespace Forum_Application_API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text { get; set; }

        public ForumThread Thread { get; set; }

        public int ThreadId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}
