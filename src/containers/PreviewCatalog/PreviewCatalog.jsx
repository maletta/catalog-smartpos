import React from 'react';
import Row from 'components/Row';
import Grid from 'components/Grid';
import { SideBarContainer } from 'components/SideBar';
import { GridProducts } from 'containers/GridProducts';

const categories = [
  {
    descricao: 'Categoria 1',
    id: '1',
  },
  {
    descricao: 'Categoria 2',
    id: '2',
  },
  {
    descricao: 'Categoria 3',
    id: '3',
  },
  {
    descricao: 'Categoria 4',
    id: '4',
  },
  {
    descricao: 'Categoria 5',
    id: '5',
  },
  {
    descricao: 'Categoria 6',
    id: '6',
  },
];

const filter = {
  categoria: 0,
  categoryName: '',
  label: '',
  orderBy: 'asc',
  page: undefined,
  redirect: false,
  search: undefined,
  sortBy: 'valorVenda',
};

const updateFilter = () => {};

const products = [
  {
    atualizacao: '2020-07-03T13:46:23.915Z',
    categoria: 'Doces',
    categoria_id: 5476,
    descricao: 'Produto 01',
    hasVariant: 0,
    id: 1,
    observacao: null,
    position_featured: 1,
    tenant_id: '3957a42e-74eb-4095-a662-70c01c346689',
    valorVenda: 100,
    viewMode: 'TEXT',
  },
  {
    atualizacao: '2020-07-03T13:46:23.915Z',
    categoria: 'Doces',
    categoria_id: 5476,
    descricao: 'Produto 01',
    hasVariant: 0,
    id: 2,
    observacao: null,
    position_featured: 1,
    tenant_id: '3957a42e-74eb-4095-a662-70c01c346689',
    valorVenda: 200,
    viewMode: 'TEXT',
  },
  {
    atualizacao: '2020-07-03T13:46:23.915Z',
    categoria: 'Doces',
    categoria_id: 5476,
    descricao: 'Produto 02',
    hasVariant: 0,
    id: 3,
    observacao: null,
    position_featured: 1,
    tenant_id: '3957a42e-74eb-4095-a662-70c01c346689',
    valorVenda: 300,
    viewMode: 'TEXT',
  },
];

const pageCount = 1;

const PreviewCatalog = () => (
  <Row>
    <Grid className="d-none d-md-block" cols="12 3 3 3 3">
      <SideBarContainer categories={categories} filter={filter} updateFilter={updateFilter} />
    </Grid>
    <GridProducts products={products} pageCount={pageCount} />
  </Row>
);
export default PreviewCatalog;
