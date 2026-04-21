import { createContext, useContext, useState } from "react";

const RouterContext = createContext(null);
export const useRouter = () => useContext(RouterContext);

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(() => {
    const saved = localStorage.getItem('acadplan_route');
    return saved || "login";
  });
  
  const navigate = (to) => {
    setRoute(to);
    localStorage.setItem('acadplan_route', to);
  };
  
  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}