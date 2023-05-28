namespace AYHF_Software_Architecture_And_Design.Infrastructure.Middleware;

using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

public class RequiresRoleAttribute : Attribute, IAuthorizationFilter
{
    private readonly string _role;

    public RequiresRoleAttribute(string role)
    {
        _role = role;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var user = (dynamic)context.HttpContext.Items["User"];
        if (user is null || user.Role != _role)
        {
            context.Result = new StatusCodeResult(403); // Forbidden
        }
    }
}