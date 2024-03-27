/* eslint-disable react/prop-types */
import Carousel from "react-grid-carousel";
import FormationCard from "./FormationComponents/FormationCard";

const SlideMenu = ({ title, list }) => {
  const listFormation = list.map((formation) => (
    <Carousel.Item key={formation.title}>
      <FormationCard key={formation.title} formation={formation} />
    </Carousel.Item>
  ));

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <p className="font-medium text-xl p-5">{title}</p>
      </div>
      <Carousel dotColorActive="#9D2CF6" 
        cols={6}
        rows={1}
        gap={10}
        loop
        showDots
        responsiveLayout={[
          {
            breakpoint: 1400,
            cols: 3,
            rows: 1,
            gap: 10,
            loop: true,
          },
        ]}
      >
        {listFormation}
      </Carousel>
    </div>
  );
};

export default SlideMenu;
