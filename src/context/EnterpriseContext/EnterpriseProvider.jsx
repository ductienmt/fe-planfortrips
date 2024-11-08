import { createContext, useState, useContext, useEffect } from "react";

const EnterpriseContext = createContext();

export const EnterpriseProvider = ({ children }) => {
  const [typeEnterprise, setTypeEnterprise] = useState(() => {
    return sessionStorage.getItem("typeEnterprise") || null;
  });

  const addTypeEnterprise = (type) => {
    sessionStorage.setItem("typeEnterprise", type);
    setTypeEnterprise(type);
  };

  const EnterpriseContextValue = {
    typeEnterprise,
    setTypeEnterprise,
    addTypeEnterprise,
  };

  return (
    <EnterpriseContext.Provider value={EnterpriseContextValue}>
      {children}
    </EnterpriseContext.Provider>
  );
};

export const useEnterprise = () => {
  return useContext(EnterpriseContext);
};
