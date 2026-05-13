import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    nome: '',
    rm: '',
    email: '',
    turma: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    foto: null,
  });

  const atualizarDados = (novosDados) => {
    setUserData((prev) => ({ ...prev, ...novosDados }));
  };

  const limparDados = () => {
    setUserData({
      nome: '',
      rm: '',
      email: '',
      turma: '',
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: '',
      foto: null,
    });
  };

  return (
    <UserContext.Provider value={{ userData, atualizarDados, limparDados }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};
