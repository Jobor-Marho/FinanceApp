using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.models
{
    // Stock model represents a stock entity in the database.
    // It contains properties that map to the database columns.
    // The [Column] attribute is used to specify the type of the column in the database
    // and to ensure that the decimal values are stored with the correct precision.
    [Table("Stocks")]
    public class Stock
    {
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Purchase { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal LastDiv { get; set; }

        public string Industry { get; set; } = string.Empty;

        public long MarketCap { get; set; }

        //Establishing the one to many relationship. one{stock} -> many{comment};
        public List<Comment> Comments { get; set;} = new List<Comment>();

    }
}