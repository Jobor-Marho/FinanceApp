using Microsoft.OpenApi.Models;
using DotNetEnv;
using backend.data;
using Microsoft.EntityFrameworkCore;
using backend.interfaces;
using backend.repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Added the controllers service to the DI container
builder.Services.AddControllers();
// Register the StockRepo as a service for dependency injection
builder.Services.AddScoped<IStockRepo, StockRepo>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FinanceAppBackend", Version = "v1" });
});
//Linking the databse to our code
// Load environment variables from .env file
Env.Load();
string? connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");

builder.Services.AddDbContext<ApplicationDBContext>(options => {
    options.UseSqlServer(connectionString!);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FinanceAppBackend v1"));
}


app.MapControllers();
app.UseHttpsRedirection();


app.Run();

