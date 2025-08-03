using System;
using backend.models;

namespace backend.interfaces
{
    public interface IStockRepo
    {
        Task<Stock> GetStockByIdAsync(int id);
        Task<IEnumerable<Stock>> GetAllStocksAsync();
        Task AddStockAsync(Stock stock);
        Task UpdateStockAsync(Stock stock);
        Task DeleteStockAsync(int id);
    }
}
