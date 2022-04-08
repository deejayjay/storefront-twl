import Head from "next/head";

import PageTitle from "../components/PageTitle/PageTitle";
import ProductCard from "../components/ProductCard/ProductCard";

export default function Home(props) {
  const products = props.products.slice(0, 5);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>A semantic title</title>
        <meta name="author" content="Deepak Joy Jose | deejayjay@zoho.com | deejayjay on GitHub" />
        <meta name="description" content="A description of the webpage." />
      </Head>

      <PageTitle title="ToysWonderLand" tagline="We write your child's Toy Story" />
      <main className="products-container">
        {products.map((product) => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </main>
    </>
  );
}

// Built-in function from Node.js (server code)
export async function getStaticProps() {
  // node.js code
  const res = await fetch("https://toysland-181818-default-rtdb.firebaseio.com/products.json");
  const productData = await res.json();

  // Transfer the Object of objects to array of objects
  const products = Object.values(productData);
  return {
    props: {
      // Same as products: products
      products
    },
    revalidate: 60 // Updates the element every 60 seconds
  };
}
