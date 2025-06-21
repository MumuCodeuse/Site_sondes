import SpaceProbe from "../data/models/bases/SpaceProbe.js";
// import { modelsBase, modelsAssociation } from "./data/index.js"

const getAllSpaceProbes = async (req, res) => {
  const spaceProbe = await SpaceProbe.findAll();
    res.json(spaceProbe);
};

const getSpaceProbeById = async (req, res) => {
  const spaceProbeId = req.params.id;
    const spaceProbe = await SpaceProbe.findByPk(spaceProbeId);

    if (!spaceProbe) {
      return res.status(404).json({ message: "Sonde non trouvée" });
    }

    res.json(spaceProbe);
};

export default { getAllSpaceProbes, getSpaceProbeById };