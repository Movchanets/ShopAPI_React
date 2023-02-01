namespace Infrastructure.Models;

public class GetProductsVM
{
    public int pageNumber { get; set; }
    public int pageSize { get; set; }
    public List<string>? Categories { get; set; }
    public string? Find { get; set; }
}