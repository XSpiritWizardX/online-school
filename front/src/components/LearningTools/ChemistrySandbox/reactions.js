// Simple reaction set for demo purposes.
// Engine prioritizes reactions that consume more atoms first.

const REACTIONS = [
  // Oxygen/Hydrogen family
  { inputs: { H: 2, O: 2 }, output: { symbol: "H2O2", name: "Hydrogen Peroxide" } },
  { inputs: { H: 2, O: 1 }, output: { symbol: "H2O",  name: "Water" } },

  // Inorganics
  { inputs: { C: 1, O: 2 }, output: { symbol: "CO2",  name: "Carbon Dioxide" } },
  { inputs: { C: 1, O: 1 }, output: { symbol: "CO",   name: "Carbon Monoxide" } },
  { inputs: { N: 1, H: 3 }, output: { symbol: "NH3",  name: "Ammonia" } },
  { inputs: { Na: 1, Cl: 1 }, output: { symbol: "NaCl", name: "Sodium Chloride" } },
  { inputs: { K: 1, Cl: 1 },  output: { symbol: "KCl",  name: "Potassium Chloride" } },
  { inputs: { Ca:1, C:1, O:3 }, output: { symbol: "CaCO3", name: "Calcium Carbonate" } },

  // Hydrocarbons (toy)
  { inputs: { C:1, H:4 }, output: { symbol: "CH4",  name: "Methane" } },
  { inputs: { C:2, H:6 }, output: { symbol: "C2H6", name: "Ethane" } },
  { inputs: { C:2, H:4 }, output: { symbol: "C2H4", name: "Ethene" } },

  // Acids/bases (very simplified)
  { inputs: { H:1, Cl:1 }, output: { symbol: "HCl", name: "Hydrochloric Acid" } },
  { inputs: { H:1, Br:1 }, output: { symbol: "HBr", name: "Hydrobromic Acid" } },
  { inputs: { H:1, F:1 },  output: { symbol: "HF",  name: "Hydrofluoric Acid" } },

  // Nitrogen oxides (toy)
  { inputs: { N:1, O:1 }, output: { symbol: "NO",  name: "Nitric Oxide" } },
  { inputs: { N:1, O:2 }, output: { symbol: "NO2", name: "Nitrogen Dioxide" } },

  // Glucose (fun)
  { inputs: { C:6, H:12, O:6 }, output: { symbol: "C6H12O6", name: "Glucose" } }
];

export default REACTIONS;
