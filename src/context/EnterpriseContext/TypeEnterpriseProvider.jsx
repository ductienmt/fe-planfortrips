import { createContext, useState, useContext } from "react";

const TypeEnterpriseContext = createContext();

export const TypeEnterpriseProvider = ({ children }) => {
  const [typeEnterprise, setTypeEnterprise] = useState(null);

  const typeEnterpriseContextValue = {
    typeEnterprise,
    setTypeEnterprise,
  };

  return (
    <TypeEnterpriseContext.Provider value={typeEnterpriseContextValue}>
      {children}
    </TypeEnterpriseContext.Provider>
  );
};

export const useTypeEnterprise = () => {
  return useContext(TypeEnterpriseContext);
};
