using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using backend.Dtos.commentdto;
using backend.models;

namespace backend.mappers.commentmappers
{
    public static class CommentMappers
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                StockId = commentModel.StockId!
            };
        }

        public static Comment ToComment(this CreateCommentDto commentdto, int stockId)
        {
            return new Comment
            {
                Title = commentdto.Title,
                Content = commentdto.Content,
                StockId = stockId
            };
        }
    }
}