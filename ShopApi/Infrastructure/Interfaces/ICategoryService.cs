
using Infrastructure.Models.Caterories;

namespace Infrastructure.Interfaces
{ 
    public interface ICategoryService
    {
        Task<int> Create(CategoryCreateVM model);
    }
}