using System;
using backend.models;
using backend.Helpers.stock;

namespace backend.interfaces.stock
{
    public interface IStockRepo
    {
        Task<Stock?> GetStockByIdAsync(int id);
        Task<Stock?> GetStockBySymbolAsync(string Symbol);
        Task<IEnumerable<Stock>> GetAllStocksAsync(QueryableObj query);
        Task AddStockAsync(Stock stock);
        Task UpdateStockAsync(Stock stock);
        Task DeleteStockAsync(Stock stock);
        Task<bool> StockExists(int stockId);
    }
}
