using DAL.Entities;
using DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories;

public class ProductRepository : GenericRepository<ProductEntity>, IProductRepository
{
    
    public ProductRepository(AppEFContext context) : base(context)
    {
        
    }

    public IQueryable<ProductEntity> Products => GetAll();
    public Task<IQueryable<ProductEntity>> SearchProducts(string name)
    {
        throw new NotImplementedException();
    }

    public async Task<ProductEntity> GetByName(string name)
    {
        {
            return await _dbContext.Set<ProductEntity>()
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Name == name);
        }
    }
}