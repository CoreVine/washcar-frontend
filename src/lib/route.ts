const routes = {
  home: "/",
  about: "/about",
  login: "/login",
  register: "/register",
  market: "/market",
  myOrders: "/my-orders/services",
  cart: "/cart",
  myAccount: "/my-account",
  users: `/users`,
  viewUser: (userId: number) => `/users/${userId}`,
  company: `/company`,
  pendingCompanies: `/company/pending`,
  carOrders: `/car-orders`,
  carWash: `/car-orders`,

  auth: {
    login: "/login",
    register: "/register",
    resetPassword: "/reset-password",
    verifyCode: "/verify-code",
    changePassword: "/change-password"
  },

  services: (service: string) => `/services/${service}`,
  categories: (category: number) => `/market/categories/${category}`,

  companyCarWash: (companyId: number) => `/services/car-wash/${companyId}`,
  buyCar: (carId: number) => `/services/buy-car/${carId}`,
  rentCar: (carId: number) => `/services/rent-car/${carId}`
}

export default routes
