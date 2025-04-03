const routes = {
  home: "/dashboard",
  about: "/about",
  login: "/login",
  register: "/register",
  market: "/market",
  myOrders: "/my-orders/services",
  myAccount: "/my-account",
  services: (service: string) => `/services/${service}`,
  categories: (category: number) => `/categories/${category}`
}

export default routes
