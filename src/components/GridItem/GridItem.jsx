import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'components/NextLink';
import useRouterHook from 'utils/useRouterHook';

import lodash from 'lodash';

import slug from 'utils/slug';
import uuidv1 from 'uuid/v1';
import ShoppingCartContext from 'contexts/ShoppingCartContext';
import Grid from 'components/Grid';
import formatCurrency from 'utils/formatCurrency';

import ShopContext from 'contexts/ShopContext';
import getModifiersOfProduct from 'api/modifiersRequests';
import NoImage from 'assets/no-image.png';

const LinkToItem = styled.a`
  color: #212529;
  text-decoration: none;
  cursor: pointer;

  :hover {
    color: #212529;
    text-decoration: none;
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.03);
  background-color: #ffff;
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5px 5px 0 0;
`;

const CardContent = styled.div`
  background-color: transparent;
  padding: 0.4rem 1rem 1rem 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const Descricao = styled.div`
  display: flex;
  text-align: left;
  font-size: 1.2rem;
  margin: 0;
  height: 50px;
  justify-content: flex-start;
  justify-items: center;
  align-items: center;
  align-self: center;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TextArea = styled.div`
  ${`display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;`}
`;

const PriceFrom = styled.p`
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: -4px;
  color: #333;
  height: 20px;
`;

const Price = styled.p`
  color: #333;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: left;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Unavailable = styled.p`
  color: gray;
  font-size: 0.8rem;
  text-align: left;
  margin: 0;
`;

const UnavailableBox = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  border: 1px solid gray;
  padding: 5px;
  margin-top: 20px;
  border-radius: 2px;
`;

const Buy = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 8px;
  margin: 0;
  margin-top: 20px;
  border-radius: 2px;
  background-color: var(--button-primary-background);
  cursor: pointer;
`;

const BuyText = styled.p`
  color: var(--button-primary-text);
  font-size: 0.8rem;
  text-align: left;
  margin: 0;
  font-weight: 700;
`;

const GridItem = (props) => {
  const router = useRouterHook();
  const { item } = props;
  const {
    id,
    atualizacao,
    viewMode,
    descricao,
    not_control_stock: dontControlStock,
    stock,
    hasVariant,
  } = item;

  const [image, setImage] = useState(NoImage);
  const imageBaseUrl = `${process.env.NEXT_PUBLIC_IMG_API}product/${id}?lastUpdate=${atualizacao}`;

  const { shop } = useContext(ShopContext);
  const { shoppingCart, updateShoppingCart } = useContext(ShoppingCartContext);

  const mounted = useRef(true);

  if (viewMode === 'IMAGE') {
    const img = new Image();
    img.src = imageBaseUrl;

    img.onload = () => {
      if (mounted.current) setImage(imageBaseUrl);
    };
  }


  useEffect(() => () => {
    mounted.current = false;
  }, []);

  const addCart = (product) => {
    getModifiersOfProduct(product.tenant_id, product.id)
      .then(({ data }) => {
        if (data.length !== 0) {
          router.push(`item/${id}/${slug(descricao)}`);
          return;
        }

        localStorage.setItem('cartInit', new Date().getTime());

        const localCart = lodash.cloneDeep(shoppingCart.cart);
        const hasItem = localCart.some(localProduct => localProduct.id === product.id);

        if (hasItem) {
          const updatedCart = localCart.map((localProduct) => {
            if (localProduct.id === product.id) {
              return {
                ...localProduct,
                quantity: localProduct.quantity + 1,
              };
            }
            return localProduct;
          });

          updateShoppingCart({
            cart: updatedCart,
            cardOverlay: true,
          });
        } else {
          const itemProduct = {
            ...product,
            quantity: 1,
            uuid: uuidv1(),
            variant: {},
            pricing: { product: product.valorVenda, modifiers: 0 },
            image: [],
            modifiers: [[]],
            note: '',
          };

          localCart.push(itemProduct);

          updateShoppingCart({
            cart: localCart,
            cardOverlay: true,
          });
        }
      });
  };

  const isItemUnavailable = dontControlStock === 0 && stock <= 0;
  const hrefToItemDescription = `/item/${id}/${slug(descricao)}`;

  const UnavailableItem = () => (
    <UnavailableBox>
      <Unavailable>PRODUTO INDISPONÍVEL</Unavailable>
    </UnavailableBox>
  );

  const ItemButton = () => (
    <Link
      href={hasVariant ? hrefToItemDescription : ''}
    >
      <LinkToItem>
        {shop.is_enableOrder === 1 && (
          <Buy onClick={() => hasVariant !== 1 && addCart(item)}>
            <BuyText>COMPRAR</BuyText>
          </Buy>
        )}
      </LinkToItem>
    </Link>
  );

  const PriceItem = () => (
    <div>
      <PriceFrom>{hasVariant ? 'A partir de ' : ''}</PriceFrom>
      <Price>{formatCurrency(item.valorVenda)}</Price>
    </div>
  );

  return (
    <>
      <Grid cols="6 4 4 4 4" className="mb-3">
        <Container>
          <Link href={hrefToItemDescription}>
            <LinkToItem>
              <Img src={image} title={descricao} />
            </LinkToItem>
          </Link>
          <CardContent>
            <PriceItem />
            <Descricao>
              <TextArea>{descricao}</TextArea>
            </Descricao>
            {isItemUnavailable ? <UnavailableItem /> : <ItemButton />}
          </CardContent>
        </Container>
      </Grid>
    </>
  );
};

GridItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    valorVenda: PropTypes.number.isRequired,
    atualizacao: PropTypes.any,
    viewMode: PropTypes.any,
    hasVariant: PropTypes.any.isRequired,
    not_control_stock: PropTypes.any,
    stock: PropTypes.any,
  }).isRequired,
};

export default GridItem;
