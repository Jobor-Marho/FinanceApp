using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using backend.Dtos.commentdto;
using backend.models;

namespace backend.interfaces.comment
{
    public interface ICommentRepo
    {
        Task<IEnumerable<CommentDto>> GetAllCommentsAsync();
        Task<CommentDto?> GetCommentThroughDtoByIdAsync(int id);
        Task<Comment> GetCommentByIdAsync(int id);
        Task<CreateCommentDto> CreateCommentAsync(int stockId, CreateCommentDto newCommentDto);
        Task DeleteCommentAsync(Comment comment);
    }
}