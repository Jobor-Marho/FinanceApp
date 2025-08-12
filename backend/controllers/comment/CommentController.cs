using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using backend.models;
using backend.interfaces.comment;
using backend.interfaces.stock;
using backend.Dtos.commentdto;

namespace backend.controllers.comment
{
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepo _repo;
        private readonly IStockRepo _stockRepo;

        public CommentController(ICommentRepo repo, IStockRepo stockrepo)
        {
            _repo = repo;
            _stockRepo = stockrepo;
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


        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDto>> GetCommentByID(int id){
            var comment = await _repo.GetCommentByIdAsync(id);

            if(comment == null){
                return NotFound();
            }
            return Ok(comment);
        }

        [HttpPost]
        [Route("{id}")]
        public async Task<ActionResult<CreateCommentDto>> CreateComment([FromRoute] int id, [FromBody] CreateCommentDto newComment){
            if (! await _stockRepo.StockExists(id)){
                return NotFound($"Stock with id:{id} does not exist.");
            }

            await _repo.CreateCommentAsync(id, newComment);

            return Ok(newComment);
        }
    }
}