using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using backend.models;
using backend.interfaces.comment;
using backend.Dtos.commentdto;

namespace backend.controllers.comment
{
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepo _repo;

        public CommentController(ICommentRepo repo)
        {
            _repo = repo;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDto>>> GetAllComments()
        {
            var comments = await _repo.GetAllCommentsAsync();
            if(!comments.Any()){
                return NotFound();
            }
            return Ok(comments);
        }


    }
}