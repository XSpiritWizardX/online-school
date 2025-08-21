// src/components/LearningTools/BiologyTool/cells.js
// Positions use an SVG viewBox = "0 0 500 500"
// You can tune positions to match your preferred layout.

const CELLS = {
  animal: {
    key: "animal",
    name: "Animal Cell",
    description: "Eukaryotic cell with membrane-bound nucleus and organelles.",
    parts: [
      { id: "nucleus", name: "Nucleus", function: "Controls cell activities and stores DNA.", x: 250, y: 240 },
      { id: "mito1", name: "Mitochondrion", function: "Produces ATP (energy).", x: 360, y: 200 },
      { id: "mito2", name: "Mitochondrion", function: "Produces ATP (energy).", x: 320, y: 320 },
      { id: "ribosomes", name: "Ribosomes", function: "Protein synthesis.", x: 180, y: 300 },
      { id: "er", name: "Endoplasmic Reticulum", function: "Synthesizes and transports proteins & lipids.", x: 280, y: 140 },
      { id: "golgi", name: "Golgi Apparatus", function: "Processes and packages proteins.", x: 140, y: 160 },
      { id: "lysosome", name: "Lysosome", function: "Digests waste material.", x: 400, y: 90 },
      { id: "membrane", name: "Cell Membrane", function: "Separates interior from exterior.", x: 250, y: 250, radius: 230 }
    ]
  },

  plant: {
    key: "plant",
    name: "Plant Cell",
    description: "Eukaryotic cell with cell wall and chloroplasts for photosynthesis.",
    parts: [
      { id: "nucleus", name: "Nucleus", function: "Controls cell activities and stores DNA.", x: 250, y: 260 },
      { id: "chlor1", name: "Chloroplast", function: "Site of photosynthesis.", x: 340, y: 160 },
      { id: "chlor2", name: "Chloroplast", function: "Site of photosynthesis.", x: 360, y: 300 },
      { id: "vacuole", name: "Vacuole", function: "Storage of water and solutes.", x: 160, y: 230 },
      { id: "cellwall", name: "Cell Wall", function: "Rigid outer layer providing structure.", x: 250, y: 250, radius: 240 },
      { id: "mito", name: "Mitochondrion", function: "Produces ATP (energy).", x: 200, y: 120 }
    ]
  },

  bacteria: {
    key: "bacteria",
    name: "Bacteria (Prokaryote)",
    description: "Prokaryotic organism (no nucleus), has nucleoid region and cell wall.",
    parts: [
      { id: "nucleoid", name: "Nucleoid (DNA)", function: "Main genetic material region (not membrane-bound).", x: 260, y: 250 },
      { id: "ribosomes", name: "Ribosomes", function: "Protein synthesis.", x: 330, y: 200 },
      { id: "flagella", name: "Flagellum", function: "Movement", x: 420, y: 260 },
      { id: "cellwall", name: "Cell Wall", function: "Structural support.", x: 250, y: 250, radius: 220 }
    ]
  },

  virus: {
    key: "virus",
    name: "Virus (particle)",
    description: "Non-cellular infectious particle (capsid + genetic material).",
    parts: [
      { id: "capsid", name: "Capsid", function: "Protein coat that protects nucleic acid.", x: 250, y: 250 },
      { id: "genome", name: "Genome (RNA/DNA)", function: "Genetic material of virus.", x: 250, y: 250 },
      { id: "spike", name: "Spike proteins", function: "Attachment to host cell.", x: 320, y: 200 }
    ]
  }
};

export default CELLS;
