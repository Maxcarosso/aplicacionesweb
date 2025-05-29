import adidasImg from '../assets/adidasmessi01.jpg';
import nikeImg from '../assets/nikezoomblancas01.jpg';
import pumaImg from '../assets/20180214_035543A.jpg';
import vansImg from '../assets/vansknunegras01.jpg';

const SIZES = Array.from({ length: 11 }, (_, i) => ({
size: 33 + i,
stock: 10,
}));

export const PRODUCTS = [
{
    id: 1,
    name: "Adidas Superstar",
    brand: "Adidas",
    price: 120000,
    image: adidasImg,
    sizes: SIZES,
},
{
    id: 2,
    name: "Nike Air Max",
    brand: "Nike",
    price: 150000,
    image: nikeImg,
    sizes: SIZES,
},
{
    id: 3,
    name: "Puma Suede Classic",
    brand: "Puma",
    price: 100000,
    image: pumaImg,
    sizes: SIZES,
},
{
    id: 4,
    name: "Vans Old Skool",
    brand: "Vans",
    price: 90000,
    image: vansImg,
    sizes: SIZES,
},
  
];
