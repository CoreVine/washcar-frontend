import { getCars } from "@/actions/cars"
import ServicesSearch from "../_components/search"
import { Settings2, X } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { SimplePagination } from "@/components/common/simple-pagination"
import CarCard from "./_components/car-card"
import BrandImage from "./_components/brand-image"
import Link from "next/link"
import { Brand, Car } from "@/types/models"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("buyCar"),
    description: t("buyCar")
  }
}

type Props = {
  searchParams: Promise<Record<string, string>>
}

// Helper function to construct proper image URLs
function getImageUrl(path: string): string {
  if (!path) return "/defaults/placeholder.png";
  
  if (path.startsWith("http")) {
    return path; // Already absolute URL
  }
  
  // For paths like "/uploads/brands/audi.png"
  if (path.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
  }
  
  return path; // Return as is for other cases
}

// Helper function to extract unique brands from car data
function extractUniqueBrands(cars: Car[]): Brand[] {
  // Use a Map for efficient lookup and deduplication
  const brandsMap = new Map<number, Brand>();
  
  // Process each car once, skipping those without brand information
  cars.forEach(car => {
    if (car.brand && !brandsMap.has(car.brand.brand_id)) {
      brandsMap.set(car.brand.brand_id, car.brand);
    }
  });
  
  // Convert to array for rendering
  return Array.from(brandsMap.values());
}

export default async function BuyCarPage({ searchParams }: Props) {
  const sp = await searchParams
  
  // Create a new search params object with the existing params
  const filterParams: Record<string, string> = { ...sp }
  
  // Add brand filter if present - make sure we're using the correct parameter name
  if (sp.brand) {
    // Using carbrand_id as the parameter name expected by the API
    filterParams.carbrand_id = sp.brand.toString()
    
    // Remove the brand parameter as it's not recognized by the API
    delete filterParams.brand
  }
  
  // Fetch cars with filters
  const cars = await getCars(filterParams)
  
  // Client-side filtering to ensure we're showing the right cars for selected brand
  let filteredCars = cars.data;
  if (sp.brand) {
    filteredCars = cars.data.filter(car => 
      car.carbrand_id && car.carbrand_id.toString() === sp.brand
    );
  }
  
  // Extract unique brands from cars data
  const uniqueBrands = extractUniqueBrands(cars.data);
  
  const selectedBrandId = sp.brand || "";
  const selectedBrand = uniqueBrands.find(brand => brand.brand_id.toString() === selectedBrandId);
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="relative max-w-4xl mx-auto mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input placeholder="Search" className="pl-10 py-6 rounded-full bg-gray-100 border-0" />
      </div>
      
      {/* Brand filtering section */}
      <div className="flex overflow-x-auto gap-4 py-4 mb-6 no-scrollbar">
        {/* All brands option */}
        <Link 
          href="?"
          className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center min-w-[100px] h-[60px] ${
            !selectedBrandId ? "ring-2 ring-blue-500 ring-inset" : ""
          }`}
        >
          <span className="font-medium">All Brands</span>
        </Link>
        
        {uniqueBrands.map((brand) => (
          <Link 
            key={brand.brand_id}
            href={`?brand=${brand.brand_id}`}
            className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center min-w-[100px] h-[60px] ${
              selectedBrandId === brand.brand_id.toString() ? "ring-2 ring-blue-500 ring-inset" : ""
            }`}
          >
            <BrandImage 
              brandLogo={getImageUrl(brand.logo)} 
              brandName={brand.name} 
            />
          </Link>
        ))}
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium">Buy car</h1>
        <button className="p-2">
          <Settings2 className="text-gray-600" size={20} />
        </button>
      </div>
      
      {/* Show selected filter with reset option */}
      {selectedBrand && (
        <div className="flex items-center gap-2 mb-4">
          <span>Filtered by brand:</span>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
            {selectedBrand.name}
            <Link href="?" className="hover:text-blue-500">
              <X size={16} />
            </Link>
          </div>
        </div>
      )}
      
      {/* Cars grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCars.map((car, index) => (
          <CarCard key={car.car_id || index} car={car} />
        ))}
      </div>
      
      {/* No results message */}
      {filteredCars.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          <p>No cars found matching your criteria</p>
        </div>
      )}
      
      {/* Pagination */}
      {filteredCars.length > 0 && (
        <SimplePagination 
          hasNextPage={!!cars.nextPage} 
          className="mt-10"
        />
      )}
    </div>
  )
}
