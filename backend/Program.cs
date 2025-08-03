using Microsoft.OpenApi.Models;
using DotNetEnv;
using backend.data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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

app.UseHttpsRedirection();


app.Run();

