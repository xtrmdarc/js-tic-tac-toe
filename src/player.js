const player = (pname, psymbol) => {
  const name = pname;
  const symbol = psymbol;
  const getName = () => name;
  const getSymbol = () => symbol;

  return { getName, getSymbol }  
}

export default player;