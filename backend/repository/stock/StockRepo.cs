using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.interfaces.stock;
using backend.models;
using backend.data;
using backend.Helpers.stock;
using Microsoft.EntityFrameworkCore;

namespace backend.repository.stock
{
    // This class implements the IStockRepo interface and provides methods to interact with the stock data.
    // It uses the ApplicationDBContext to perform CRUD operations on the Stock entity.
    public class StockRepo : IStockRepo
    {
        private readonly ApplicationDBContext _context;
        public StockRepo(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Stock?> GetStockByIdAsync(int id)
        {
            return await _context.Stocks.Include(c => c.Comments).FirstOrDefaultAsync(s => s.Id == id);
        }
        public async Task<Stock?> GetStockBySymbolAsync(string Symbol)
        {
            return await _context.Stocks.FirstOrDefaultAsync(s => s.Symbol.ToLower() == Symbol.ToLower());
        }

        public async Task<IEnumerable<Stock>> GetAllStocksAsync(QueryableObj query)
        {
            var stocks = _context.Stocks.Include(c => c.Comments).AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.CompanyName)){
                stocks = _context.Stocks.Where(s => s.CompanyName == query.CompanyName);
            }

            // manual pagination logic
            var skipNumber = (query.PageNumber - 1) * query.PageSize;
            return await stocks.Skip(skipNumber).Take(query.PageSize).ToListAsync();

        }

        public async Task AddStockAsync(Stock stock)
        {
            await _context.Stocks.AddAsync(stock);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateStockAsync(Stock stock)
        {
            _context.Stocks.Update(stock);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteStockAsync(Stock stock)
        {
             _context.Stocks.Remove(stock);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> StockExists(int stockId)
        {
            return await _context.Stocks.AnyAsync(stock => stock.Id == stockId);
        }
    }
}