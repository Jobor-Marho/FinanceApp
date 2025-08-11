using System;
using backend.models;

namespace backend.interfaces.stock
{
    public interface IStockRepo
    {
        Task<Stock?> GetStockByIdAsync(int id);
        Task<Stock?> GetStockBySymbolAsync(string Symbol);
        Task<IEnumerable<Stock>> GetAllStocksAsync();
        Task AddStockAsync(Stock stock);
        Task UpdateStockAsync(Stock stock);
        Task DeleteStockAsync(Stock stock);
    }
}
