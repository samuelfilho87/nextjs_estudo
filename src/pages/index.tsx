import SEO from '@/components/SEO';
import Link from 'next/link';
import { client } from '@/lib/prismic';
import { GetServerSideProps } from 'next';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { Title } from '../styles/pages/Home';

interface HomeProps {
  recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO title="DevCommerce, o seu e-commerce top das galáxias!" shouldExludeTitleSuffix />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ]);
  
  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
