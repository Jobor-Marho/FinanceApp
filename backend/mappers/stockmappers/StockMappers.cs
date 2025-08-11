using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using backend.Dtos.stockdto;
using backend.mappers.commentmappers;

namespace backend.mappers.stockmappers
{
    // Mappers connect a model to its dto
    public static class StockMappers
    {
        // Stock Extenstion to convert stock object to a stockdto
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase,
                LastDiv = stockModel.LastDiv,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap,
                Comments = stockModel.Comments.Select(c => c?.ToCommentDto()).ToList()
            };
        }

        public static Stock ToStockOnCreate(this CreateStockDto obj)
        {
            return new Stock
            {
                Symbol = obj.Symbol,
                CompanyName = obj.CompanyName,
                Purchase = obj.Purchase,
                LastDiv = obj.LastDiv,
                Industry = obj.Industry,
                MarketCap = obj.MarketCap
            };
        }

    }
}