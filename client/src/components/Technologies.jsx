import { technologies } from "../constants";
import styles from "../style";

const TechnologyRow = ({ technologies, items_property, margin }) => {
  return (
    <div className={`flex justify-center items-${items_property} flex-wrap w-full ${margin}`}>
      {technologies.map((client) => (
        <div
          key={client.id}
          className={`flex-1 ${styles.Start} sm:min-w-[192px] min-w-[120px] m-5`}
        >
          <img
            src={client.logo}
            alt="client_logo"
            className="sm:w-[192px] w-[60px] h-[60px] object-contain"
          />
        </div>
      ))}
    </div>
  );
};

const Technologies = () => {
  return (
    <section
      className="my-4"
      id="technologies"
    >
      <div className="flex flex-col">
      <TechnologyRow technologies={technologies.slice(0,3)} items_property="start"/>
      <TechnologyRow technologies={technologies.slice(3,6)} items_property="center" margin="ml-48"/>
      <TechnologyRow technologies={technologies.slice(6,9)} items_property="start" />
      </div>
    </section>
  );
};

export default Technologies;
