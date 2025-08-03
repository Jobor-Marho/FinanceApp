using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.models
{
    // Comment model represents a comment entity in the database.
    // It contains properties that map to the database columns.
    // The CreatedOn property is initialized to the current date and time.
    public class Comment
    {
        public int Id {get; set;}
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn {get; set;} = DateTime.Now;

        // Establishing the many to one relationship{many {comments} -> one {stock}}
        public int? StockId { get; set; }
        // Important to access the stock attributes & methods.
        public Stock? Stock {get; set;}
    }
}