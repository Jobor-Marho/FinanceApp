using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.interfaces;
using backend.models;
using backend.data;
using Microsoft.EntityFrameworkCore;

namespace backend.repository
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
            return await _context.Stocks.FindAsync(id);
        }
        public async Task<Stock?> GetStockBySymbolAsync(string Symbol)
        {
            return await _context.Stocks.FirstOrDefaultAsync(s => s.Symbol.ToLower() == Symbol.ToLower());
        }
        public async Task<IEnumerable<Stock>> GetAllStocksAsync()
        {
            return await _context.Stocks.ToListAsync();
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
        public async Task DeleteStockAsync(int id)
        {
            var stock = await _context.Stocks.FindAsync(id);
            if (stock != null)
            {
                _context.Stocks.Remove(stock);
                await _context.SaveChangesAsync();

            }
        }
    }
}