using AYHF_Software_Architecture_And_Design.Application.Dtos;
using AYHF_Software_Architecture_And_Design.Application.Services;
using AYHF_Software_Architecture_And_Design.Domain.Entities.Model;
using AYHF_Software_Architecture_And_Design.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AYHF_Software_Architecture_And_Design.Routes;

public class OrderRoutes
{
    private readonly WebApplication _app;

    public OrderRoutes(WebApplication app)
    {
        _app = app;
    }

    public void Configure()
    {
        _app.MapGet("/orders/{id}", async (int id, [FromServices] OrderService orderService) =>
        {
            var order = await orderService.GetOrderByIdAsync(id);
            return Results.Ok(order);
        });

        _app.MapGet("/orders",
            async ([FromServices] OrderService orderService) => await orderService.GetAllOrdersAsync());

        var userRepository = new UserRepository();
        _app.MapPost("/orders", async ([FromBody] OrderDto orderDto, [FromServices] OrderService orderService) =>
        {
            var order = await orderService.AddOrderAsync(orderDto);
            return Results.Created($"/orders/{order.Id}", order);
        });

        _app.MapPut("/orders/{id}", async (int id, [FromBody] OrderDto orderDto, [FromServices] OrderService orderService) =>
        {
            if (id != orderDto.Id) return Results.BadRequest();
            var userRepository = new UserRepository();
            if (await userRepository.GetUserByIdAsync(orderDto.UserId) is not Customer) return Results.BadRequest();

            var order = new Order();
            await orderService.UpdateOrderAsync(order);
            return Results.NoContent();
        });

        _app.MapDelete("/orders/{id}", async (int id, [FromServices] OrderService orderService) =>
        {
            await orderService.DeleteOrderAsync(id);
            return Results.NoContent();
        });
    }
}