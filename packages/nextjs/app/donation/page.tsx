import ProjectList from "./ProjectListing";
import type { NextPage } from "next";

const Donation: NextPage = () => {
  const projects = {
    live: [{ id: 1, name: "motoDEX", goal: "10000 ICP", status: "Live Now", creator: "Oleksii Vynogradov" }],
    fullyFunded: [
      { id: 2, name: "DRat", goal: "300 ICP", status: "Fully Funded", creator: "DRat Team" },
      { id: 3, name: "ToyoWorld", goal: "5000 ICP", status: "Fully Funded", creator: "ToyoWorld Team" },
      { id: 4, name: "Cubetopia", goal: "3000 ICP", status: "Fully Funded", creator: "Cubetopia Team" },
      { id: 5, name: "Cosmicrafts", goal: "3000 ICP", status: "Fully Funded", creator: "Omar Hernandez Salmeron" },
    ],
    closed: [
      { id: 6, name: "Project Closed 1", goal: "2500 ICP", status: "Closed", creator: "Closed Team 1" },
      { id: 7, name: "Project Closed 2", goal: "1000 ICP", status: "Closed", creator: "Closed Team 2" },
    ],
  };
  return (
    <>
      <ProjectList projects={projects}/>
    </>
  );
};

export default Donation;