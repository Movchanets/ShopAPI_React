using Infrastructure.Interfaces;
using Services;

namespace Infrastructure.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _ProductRepository;
    public ProductService(IBlogRepository ProductRepository)
    {
        _ProductRepository = ProductRepository;
    }
    public Task<ServiceResponse> GetProductsAsync(string name)
        {
            var res = await _ProductRepository.GetPostAsync(name);
            return new ServiceResponse
            {
                Message = "GetProduct",
                IsSuccess = true,
                Payload = res
            };
        }
}

}