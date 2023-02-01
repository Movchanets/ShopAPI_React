using Services;

namespace Infrastructure.Interfaces;

public interface IProductService
{
     Task<ServiceResponse> GetProductsAsync(string name);
}