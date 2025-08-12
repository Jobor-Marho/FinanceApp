using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using backend.Dtos.commentdto;

namespace backend.interfaces.comment
{
    public interface ICommentRepo
    {
        Task<IEnumerable<CommentDto>> GetAllCommentsAsync();
        Task<CommentDto?> GetCommentByIdAsync(int id);

        Task<CreateCommentDto> CreateCommentAsync(int stockId, CreateCommentDto newCommentDto);
    }
}