import {
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Accueil, StatistiqueNaissance} from "@/pages/page";

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
    ],
  },
];

export default routes;
