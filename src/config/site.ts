export const siteConfig = {
  name: "Vila do Papai Noel",
  guaranteeDays: 7,
  plans: {
    starter: {
      name: "VILA STARTER",
      price: 10,
      checkoutUrl: "",
    },
    premium: {
      name: "VILA COMPLETA",
      price: 27,
      checkoutUrl: "",
    },
    exitOffer: {
      name: "VILA COMPLETA — OFERTA ESPECIAL",
      price: 19.9,
      checkoutUrl: "",
    },
  },
};

export const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
