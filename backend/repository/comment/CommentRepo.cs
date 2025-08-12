using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using backend.interfaces.comment;
using backend.data;
using backend.models;
using backend.mappers.commentmappers;
using backend.Dtos.commentdto;

namespace backend.repository.comment
{
    public class CommentRepo : ICommentRepo
    {
        private readonly ApplicationDBContext _context;
        public CommentRepo(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CommentDto>> GetAllCommentsAsync()
        {
            var comments = await _context.Comments.AsNoTracking().ToListAsync();
            return comments.Select(c => c.ToCommentDto());

        }

        public async Task<CommentDto?> GetCommentByIdAsync(int id){
            var comment = await _context.Comments.FindAsync(id);
            if(comment == null){
                return null;
            }
            return comment.ToCommentDto();
        }

        public async Task<CreateCommentDto> CreateCommentAsync(int stockId, CreateCommentDto newCommentDto){
            var newComment = newCommentDto.ToComment(stockId);

            await _context.AddAsync(newComment);
            await _context.SaveChangesAsync();

            return newCommentDto;
        }
    }
}