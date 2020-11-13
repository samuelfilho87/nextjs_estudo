import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  /**
   * Client Side Fetching
   */

  // const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
  
  // useEffect(() => {
  //   fetch('http://localhost:3333/recommended').then(response => {
  //     response.json().then(data => {
  //       setRecommendedProducts(data);
  //     });
  //   })
  // }, []);

  async function handleSum() {
    const math = (await import('../lib/math')).default;

    alert(math.sum(3, 5));
  }

  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            );
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();
  
  return {
    props: {
      recommendedProducts
    }
  }
}
