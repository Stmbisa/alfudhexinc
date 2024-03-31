import Image from "next/image";
import styles from "./home.module.css";
import HomePageSlider from '@/components/homepageslider/HomePageSlider';

const Home = () => {
  return (
    <HomePageSlider/>
    // below will contain a component to list all jobs listed,
    // a component for some blogs latests, 
  );
};

export default Home;
