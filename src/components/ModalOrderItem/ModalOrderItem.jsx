import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';
import { Formik, Form, Field } from 'formik';
import { injectIntl, intlShape } from 'react-intl';
import {
  shape, func, bool, string,
} from 'prop-types';

import SelectDropDown from 'components/Form/SelectDropDown';
import Button from 'components/Form/Button';
import TextArea from 'components/Form/TextArea';
import Input from 'components/Form/Input';
import getVariantsOfProduct from 'api/variantsRequests';

import orderValidation from './orderSchema';

const AreaTitle = styled.div`
  background: #00529b;
  padding: 5px 20px 5px 20px;
  margin: -20px -19px 0 -20px;
  border-radius: 5px 5px 0 0;
`;

const Title = styled.h3`
  font-size: 1.3rem;
  color: #fff;
`;

const Content = styled.div`
  padding-top: 10px;
  width: 500px;

  @media (max-width: 992px) {
    width: 400px;
  }

  @media (max-width: 768px) {
    width: 300px;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 5px;
`;

const Price = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const LabelVariant = styled.div`
  display: flex !important;
  width: 100%;
  justify-content: space-between !important;
`;

const AreaButtonFlex = styled.div`
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ModalOrderItem = (props) => {
  const {
    intl, productOnModal, setProductOnModal, modalOpen, setModalOpen, storeId,
  } = props;
  const [variantSelected, setVariantSelected] = useState({ name: '' });
  const [variants, setVariants] = useState([]);

  const initialValues = {
    variant: {},
    note: '',
    amount: 1,
  };

  useEffect(() => {
    if (productOnModal.id) {
      getVariantsOfProduct(storeId, productOnModal.id).then((response) => {
        setVariants(response.data);
      });
    }
  }, [productOnModal.id]);

  const submitOrderItem = values => values;

  return (
    <Modal
      open={modalOpen}
      styles={{
        modal: {
          borderRadius: '5px',
        },
        closeIcon: {
          fill: '#fff',
          marginTop: '-8px',
          cursor: 'pointer',
        },
      }}
      onClose={() => setModalOpen(false)}
      center
    >
      <AreaTitle>
        <Title>{productOnModal.descricao}</Title>
      </AreaTitle>
      <Content>
        <Description>{productOnModal.observacao}</Description>
        <Price>{intl.formatNumber(productOnModal.valorVenda, { style: 'currency', currency: 'BRL' })}</Price>
        <Formik
          onSubmit={submitOrderItem}
          initialValues={initialValues}
          validationSchema={orderValidation(variants)}
          enableReinitialize
          render={propsForm => (
            <Form>
              <div className="">
                {(variants.length > 0) && (
                  <div className="columns is-paddingless">
                    <div className="column is-12 is-mb-paddingless">
                      <SelectDropDown
                        id="variants"
                        label="Variações"
                        options={variants}
                        getOptionLabel={label => (
                          <LabelVariant>
                            <div>{label.name}</div>
                            {(label.sellValue) && (<div>{intl.formatNumber(label.sellValue, { style: 'currency', currency: 'BRL' })}</div>)}
                          </LabelVariant>
                        )}
                        getOptionValue={option => option.id}
                        value={variantSelected}
                        onChange={(value) => {
                          propsForm.setFieldValue('variant', value);
                          setVariantSelected({ name: value.name });
                          setProductOnModal(prevState => ({
                            ...prevState,
                            valorVenda: value.sellValue,
                          }));
                        }}
                        isInvalid={propsForm.errors.variant}
                        touched={propsForm.touched.variant}
                        isRequired
                      />
                    </div>
                  </div>
                )}
                <div className="columns is-paddingless">
                  <div className="column is-mb-paddingless is-12 is-mb-paddingless">
                    <Field
                      name="note"
                      inputId="observacao"
                      component={TextArea}
                      label="Observação"
                      rows={3}
                    />
                  </div>
                </div>
                <div className="columns is-paddingless ">
                  <div className="column is-12-mobile is-6-desktop  ">
                    <Field
                      name="amount"
                      label="Quantidade"
                      type="number"
                      min="1"
                      component={Input}
                    />
                  </div>
                  <AreaButtonFlex className="column is-6 is-flex is-fixed-bottom">
                    <div>
                      <Button
                        value="Adicionar"
                        type="submit"
                      />
                    </div>
                  </AreaButtonFlex>
                </div>
              </div>
            </Form>
          )}
        />
      </Content>
    </Modal>
  );
};

ModalOrderItem.propTypes = {
  intl: intlShape.isRequired,
  productOnModal: shape({}).isRequired,
  setProductOnModal: func.isRequired,
  modalOpen: bool.isRequired,
  setModalOpen: func.isRequired,
  storeId: string,
};

ModalOrderItem.defaultProps = {
  storeId: '',
};

export default injectIntl(ModalOrderItem);
