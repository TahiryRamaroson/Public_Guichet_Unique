import {
  Carousel,
  Card,
  Button,
  Typography,
} from "@material-tailwind/react";

import { information_accueil } from "@/data/accueil";

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export function Accueil() {
  
  return (
    <div className="relative h-screen bg-cover bg-center flex items-center justify-center min-h-screen" style={{ backgroundImage: "url('../../public/img/bg_public_gu.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Typography variant="h2" className="z-10 absolute top-20 m-auto text-center" color="white">Indicateurs sociaux et suivi du bien être de la population à Madagascar</Typography>
      <section className="m-8 flex bg-blue-gray items-center justify-center w-[80vw]">
        <div className="w-3/5 lg:w-3/5 m-auto z-10">
          <Carousel
            className="rounded-l-xl w-[100%]"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                      activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            {information_accueil && information_accueil.map((item) => (   
              <div key={item.titre} className="flex gap-5 items-center justify-center h-[50vh] bg-blue-500 opacity-60 text-white">
                <Typography variant="h4" color="white" className="absolute top-5 break-words whitespace-normal overflow-auto ml-20 mr-20">{item.titre}</Typography>
                <Typography variant="paragraph" color="white" className="break-words whitespace-normal overflow-auto ml-20 mr-20">{item.description}</Typography>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-2/5 h-[50vh] lg:block bg-white z-10 rounded-r-xl">
          <Card className="w-full grid grid-cols-1 gap-3 place-items-center" shadow={false}>
            <img src="../../../public/img/logo_mps.png" className="h-20"/>
            
              <Button className="w-[50%]" color="blue" variant="gradient">
                <Link to="/page/statistique-naissance">
                  Naissance
                </Link>
              </Button>
            
            <Button className="w-[50%]" color="blue" variant="gradient">
              Grossesse
            </Button>
            <Button className="w-[50%]" color="blue" variant="gradient">
              Décès
            </Button>
            <Button className="w-[50%]" color="blue" variant="gradient">
              Migration
            </Button>
            <Button className="w-[50%]" color="blue" variant="gradient">
              Plainte
            </Button>
          </Card>
        </div>

      </section>
    </div>
  );
}

export default Accueil;
