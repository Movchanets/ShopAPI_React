using DAL.Entities;
using DAL.Entities.Identity;
using DAL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Primitives;
using ShopApi.Constants;

namespace ShopApi
{
    public static class SeederDB
    {
        public static async void SeedData(this IApplicationBuilder app)
        {
            using(var scope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
                var roleManaager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
                var categoryRepository = scope.ServiceProvider.GetRequiredService<ICategoryRepository>();
                
                if(!roleManaager.Roles.Any())
                {
                    var result = roleManaager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.Admin
                    }).Result;
                    result = roleManaager.CreateAsync(new RoleEntity
                    {
                        Name = Roles.User
                    }).Result;
                }

                if(!userManager.Users.Any())
                {
                    string admin = "admin@gmail.com";
                    var user = new UserEntity
                    {
                        Email = admin,
                        UserName = admin,
                        FirstName = "Марко",
                        LastName = "Главний"
                    };
                    var result = userManager.CreateAsync(user, "123456").Result;
                    result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                }
            
                if(!categoryRepository.Categories.Any())
                {

                    CategoryEntity[] categories = {
                        new CategoryEntity
                        {
                           DateCreated=DateTime.Now.ToUniversalTime(),
                           Name="Ноутбуки"
                        },
                        new CategoryEntity
                        {
                           DateCreated=DateTime.Now.ToUniversalTime(),
                           Name="Одяг"
                        }
                    };
                    foreach(var item in categories)
                    {
                        await categoryRepository.Create(item);
                    }
                }
            }
        }
    }
}
