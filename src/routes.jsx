import {
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Accueil, StatistiqueDeces, StatistiqueGrossesse, StatistiqueMigration, StatistiqueNaissance, StatistiquePlainte} from "@/pages/page";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "page",
    layout: "page",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "accueil",
        path: "/accueil",
        element: <Accueil />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "statistique-naissance",
        path: "/statistique-naissance",
        element: <StatistiqueNaissance />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "statistique-grossesse",
        path: "/statistique-grossesse",
        element: <StatistiqueGrossesse />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "statistique-deces",
        path: "/statistique-deces",
        element: <StatistiqueDeces />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "statistique-plainte",
        path: "/statistique-plainte",
        element: <StatistiquePlainte />,
      },
      {
        icon: <ServerStackIcon {...icon} />,
        name: "statistique-migration",
        path: "/statistique-migration",
        element: <StatistiqueMigration />,
      },
    ],
  },
];

export default routes;
