export const abbreviate = (address: string) => {
  return `${address.slice(0, 7)}...${address.slice(-4)}`;
};
