﻿using AutoMapper;
using Forum_Application_API.Dto;
using Forum_Application_API.Interfaces;
using Forum_Application_API.Methods;
using Forum_Application_API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Forum_Application_API.Controllers
{
    [Route("/api[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserInterface _userInterface;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly JwtGenerator _jwtGenerator;
        private readonly IMapper _mapper;
        public UserController(IUserInterface userInterface, IMapper mapper, UserManager<User> userManager, SignInManager<User> signInManager, JwtGenerator jwtGenerator)
        {
            _userInterface = userInterface;
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtGenerator = jwtGenerator;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<User>>(_userInterface.GetUsers());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(users);
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]

        //THIS RETURNS A SINGLE ITEM
        public IActionResult GetUser(int userId)
        {
            if (!_userInterface.UserExists(userId))
            {
                return NotFound();
            }

            var user = _mapper.Map<UserDto>(_userInterface.GetUser(userId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(user);
        }


        [HttpGet("{userId}/threads")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]

        public IActionResult GetThreadsByUser(int userId)
        {
            if (!_userInterface.UserExists(userId))
            {
                return NotFound();
            }

            var threads = _mapper.Map<List<ThreadDto>>(_userInterface.GetThreadsByUser(userId));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(threads);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public async Task<IActionResult> CreateUser([FromBody] UserDto userCreate)
        {
            if (userCreate == null)
            {
                return BadRequest(ModelState);
            }

            var user = _userInterface.GetUsers().Where(u => u.Email.ToUpper() == userCreate.Email.ToUpper()).FirstOrDefault();

            var userIDExists = _userInterface.GetUsers().Where(u => u.Id == userCreate.Id).FirstOrDefault();

            if (user != null || userIDExists != null)
            {
                ModelState.AddModelError("", "User already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userMap = new User
            {
                UserName = userCreate.Email, 
                Email = userCreate.Email,
                FirstName = userCreate.FirstName,
                LastName = userCreate.LastName,
    };
        
            var result = await _userManager.CreateAsync(userMap, userCreate.Password);

            if (result.Succeeded)
            {
                return Ok("Successfully Created");
            }

            else
            {
                return BadRequest(result.Errors);
            }

            /*if (!_userInterface.CreateUser(userMap))
            {
                ModelState.AddModelError("", "Something went wrong while creating User");
                return StatusCode(500, ModelState);
            }*/


        }


        [HttpPost("login")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public async Task<IActionResult> LoginUser([FromBody] LoginUserDto userEntered)
        {
            // Validate the model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(userEntered.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, userEntered.Password))
            {
                return Unauthorized();
            }


            /*
            var user = await _userManager.FindByEmailAsync(model.Email);
            var token = _jwtGenerator.GenerateToken(user);
            return Ok(new { Token = token });
            */

            var token = _jwtGenerator.GenerateToken(user);
            return Ok(new { Token = token });
        }
    
                    

        //UPDATE
        [HttpPut("{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateOwner(int userId, [FromBody] UserDto updatedUser)
        {
            if (updatedUser == null) return BadRequest(ModelState);

            if (userId != updatedUser.Id) return BadRequest(ModelState);

            if (!_userInterface.UserExists(userId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userMap = _mapper.Map<User>(updatedUser);

            if (!_userInterface.UpdateUser(userMap))
            {
                ModelState.AddModelError("", "Something went wrong when updating User");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{userId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteOwner(int userId)
        {
            if (!_userInterface.UserExists(userId))
            {
                return NotFound();
            }

            var userToDelete = _userInterface.GetUser(userId);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_userInterface.DeleteUser(userToDelete))
            {
                ModelState.AddModelError("", "Somethiing went wrong with deleting User");
            }

            return NoContent();
        }
    }
}