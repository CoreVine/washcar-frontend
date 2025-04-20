const routes = {
  home: "/dashboard",
  about: "/about",
  login: "/login",
  register: "/register",
  market: "/market",
  myOrders: "/my-orders/services",
  cart: "/cart",
  myAccount: "/my-account",
  services: (service: string) => `/services/${service}`,
  categories: (category: number) => `/market/categories/${category}`,

  companyCarWash: (companyId: number) => `/services/car-wash/${companyId}`,
  buyCar: (carId: number) => `/services/buy-car/${carId}`,
  rentCar: (carId: number) => `/services/rent-car/${carId}`
}

export default routes
