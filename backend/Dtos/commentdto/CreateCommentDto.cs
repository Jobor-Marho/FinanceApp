using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.commentdto
{
    public class CreateCommentDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MinLength(5, ErrorMessage = "Minimum length must be 5 characters")]
        [MaxLength(200, ErrorMessage = "Maximum length must be 200 characters")]
        public string Content { get; set; } = string.Empty;
    }
}