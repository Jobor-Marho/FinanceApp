using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.interfaces;
using backend.models;
using backend.Dtos.stockdto;
using backend.mappers.stockmappers;

namespace backend.controllers
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

        [HttpGet("{id}")]
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

    }
}