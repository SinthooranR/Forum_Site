using AutoMapper;
using Forum_Application_API.Dto;
using Forum_Application_API.Interfaces;
using Forum_Application_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Forum_Application_API.Controllers
{
    [Route("/api[controller]")]
    [ApiController]
    public class ThreadController : Controller
    {

        private readonly IThreadInterface _threadInterface;
        private readonly IUserInterface _userInterface;
        private readonly ICommentInterface _commentInterface;
        private readonly IMapper _mapper;
        public ThreadController(IThreadInterface threadInterface, IUserInterface userInterface, IMapper mapper, ICommentInterface commentInterface)
        {
            _mapper = mapper;
            _threadInterface = threadInterface;
            _userInterface = userInterface;
            _commentInterface = commentInterface;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ForumThread>))]
        public IActionResult GetThreads()
        {
            var threads = _mapper.Map<List<ForumThread>>(_threadInterface.GetThreads());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(threads);
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]

        public IActionResult GetThreadByUserId(int userId)
        {
            if (!_userInterface.UserExists(userId))
            {
                return NotFound();
            }

            var threads = _mapper.Map<List<ThreadDto>>(_threadInterface.GetThreadsByUser(userId));
            


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(threads);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public IActionResult CreateForumThread([FromQuery] int userId, [FromBody] ThreadDto threadCreate)
        {

            if (threadCreate == null)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var threadMap = _mapper.Map<ForumThread>(threadCreate);
            
            var user = _userInterface.GetUser(userId);

            if(user == null)
            {
                ModelState.AddModelError("", "User does not exists");
                return StatusCode(422, ModelState);
            }

            threadMap.User = _userInterface.GetUser(userId);


            if (!_threadInterface.CreateThread(threadMap))
            {
                ModelState.AddModelError("", "Something went wrong while creating Thread");
                return StatusCode(500, ModelState);
            }

            return Ok("Successfully created");
        }

        [HttpPut("{threadId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateThread(int threadId, [FromQuery] int userId, [FromBody] ThreadDto updatedThread)
        {
            if (updatedThread == null) return BadRequest(ModelState);

            if (threadId != updatedThread.Id) return BadRequest(ModelState);

            if (!_threadInterface.ThreadExists(threadId)){
                return NotFound();
            }

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var threadMap = _mapper.Map<ForumThread>(updatedThread);

            if (!_threadInterface.UpdateThread(userId, threadMap))
            {
                ModelState.AddModelError("", "Something went wrong when updating Thread");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{threadId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteThread(int threadId, [FromQuery] int userId)
        {
            if (!_threadInterface.ThreadExists(threadId))
            {
                return NotFound();
            }

            var commentsToDelete = _commentInterface.GetCommentsByThread(threadId);
            var threadToDelete = _threadInterface.GetThread(threadId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //NEED TO DELETE REVIEWS AS A LIST
            if (!_commentInterface.DeleteComments(commentsToDelete.ToList()))
            {
                ModelState.AddModelError("", "Somethiing went wrong with deleting Comments");
            }

            if (!_threadInterface.DeleteThread(userId, threadToDelete))
            {
                ModelState.AddModelError("", "Somethiing went wrong with deleting Thread");
            }

            return NoContent();

        }

    }
}
