using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.interfaces.stock;
using backend.models;
using backend.Dtos.stockdto;
using backend.mappers.stockmappers;

namespace backend.controllers.stock
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IStockRepo _stockRepo;

        public StockController(IStockRepo stockRepo)
        {
            _stockRepo = stockRepo;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Stock>> GetStockById(int id)
        {
            var stock = await _stockRepo.GetStockByIdAsync(id);
            if (stock == null)
            {
                return NotFound();
            }
            return Ok(stock.ToStockDto());
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Stock>>> GetAllStocks()
        {
            var stocks = await _stockRepo.GetAllStocksAsync();
            return Ok(stocks.Select(s => s.ToStockDto()));
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateStock([FromBody] CreateStockDto requestDto)
        {
            var newStock = requestDto.ToStockOnCreate();

            try{
                if(await _stockRepo.GetStockBySymbolAsync(newStock.Symbol) != null)
                {
                    return BadRequest($"{newStock.Symbol} already exists. Please reconfirm the symbol and try again");
                };

                await _stockRepo.AddStockAsync(newStock);

                return CreatedAtAction(nameof(GetStockById), new {id = newStock.Id}, newStock);
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }


        }
        [HttpPut("update/{id:int}")]
        public async Task<ActionResult> UpdateStock(int id, [FromBody] CreateStockDto updatedStock)
        {
            var existingStock = await _stockRepo.GetStockByIdAsync(id);
            if (existingStock == null)
            {
                return NotFound();
            }
            existingStock.Symbol = updatedStock.Symbol;
            existingStock.CompanyName = updatedStock.CompanyName;
            existingStock.Purchase = updatedStock.Purchase;
            existingStock.LastDiv = updatedStock.LastDiv;
            existingStock.Industry = updatedStock.Industry;
            existingStock.MarketCap = updatedStock.MarketCap;

            await _stockRepo.UpdateStockAsync(existingStock);

            return Ok("Stock has been updated successfully!");
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> DeleteStock([FromRoute] int id)
        {
            var stock = await _stockRepo.GetStockByIdAsync(id);

            if( stock == null)
            {
                return NotFound();
            }
            await _stockRepo.DeleteStockAsync(stock);
            return Ok("Stock has been deleted!");
        }

    }
}