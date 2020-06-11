import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { injectIntl, intlShape } from "react-intl";

import TextArea from "components/Form/TextArea";
import Counter from "components/Form/Counter";

import DeleteButton from "./components/DeleteButton";
import ItemImage from "./components/ItemImage";
import NoteButton from "./components/NoteButton";

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 15px 0;
  height: 100%;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: start;
    padding: 15px;
    border-bottom: 3px solid #eee;
  }
`;

const TitleItem = styled.h2`
  font-weight: 400;
  color: #363636;
  margin: 0;

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const ItemDescription = styled.span`
  color: #333;
  font-size: 0.9rem;

  @media (max-width: 992px) {
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 0.4rem;
  }
`;

const AreaControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ControlAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-right: 30px;

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

const ItemPricing = styled.div`
  color: #333;
  font-size: 1.9rem;
  width: 170px;

  @media (max-width: 992px) {
    font-size: 1.5rem;
    width: 145px;
  }
`;

const LabelItem = styled.p`
  margin: 0;
`;

const ObservationButton = styled.p`
  cursor: pointer;
  color: var(--color-primary);
`;

const CartItem = props => {
  const { product, intl, deleteItem, updateAmount, prodIndex } = props;

  const [showObservation, setShowObservation] = useState(false);

  const variantName = product.variant.name ? `- ${product.variant.name}` : "";
  const productName = `${product.descricao} ${variantName}`;
  const productPrice = intl.formatNumber(
    (product.pricing.product + product.pricing.modifiers) * product.quantity,
    { style: "currency", currency: "BRL" }
  );

  return (
    <ListItem>
      <>
        <div className="d-flex justify-content-start">
          <ItemImage product={product} />
          <div>
            <LabelItem>Produto</LabelItem>
            <TitleItem>{productName}</TitleItem>
            <ItemDescription>
              {product.modifiers.map((modifier, modIndex) =>
                modifier.map((item, index) =>
                  modIndex || index ? ` | ${item.name} ` : item.name
                )
              )}
            </ItemDescription>
          </div>
          <DeleteButton onClick={() => deleteItem(product.uuid)} />
        </div>
        <ObservationButton onClick={() => setShowObservation(!showObservation)}>
          {"Adicionar observação"}
        </ObservationButton>
        {showObservation && (
          <TextArea
            inputId={`obs-${product.uuid}`}
            label="Observação"
            rows={3}
          />
        )}
        <AreaControl>
          {product.note && product.note.length > 0 && (
            <NoteButton note={product.note} />
          )}
          <NoteButton note={product.note} />
          <ControlAmount>
            <Counter
              limit={100}
              min={1}
              value={product.quantity}
              counter={amount => {
                updateAmount(amount, prodIndex);
              }}
            />
          </ControlAmount>
          <div>
            <LabelItem>Preço</LabelItem>
            <ItemPricing>{productPrice}</ItemPricing>
          </div>
        </AreaControl>
      </>
    </ListItem>
  );
};

CartItem.propTypes = {
  intl: intlShape.isRequired,
  product: PropTypes.shape({}).isRequired,
  deleteItem: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  prodIndex: PropTypes.number.isRequired
};

export default injectIntl(CartItem);
