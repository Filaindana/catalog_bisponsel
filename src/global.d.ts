// global type declarations

// allow importing any CSS file
declare module "*.css";

// specifically cover swiper css imports used in components
// this catches paths like "swiper/css" and "swiper/css/pagination"
declare module "swiper/css/*";
