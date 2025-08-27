import { gql } from '@apollo/client';


export const GET_BRANDS = gql`
query {
  findAllBrands {
    id
    name
    origin
    image
  }
}
`;


export const GET_MODELS_BY_BRAND = gql`
query ModelsByBrand($id: ID!, $sortBy: sortBy!) {
  findBrandModels(id: $id, sortBy: $sortBy) {
    id
    name
    type
    image
    price
    description
    specs {
      bodyWood
      neckWood
      fingerboardWood
      pickups
      tuners
      scaleLength
      bridge
    }
    musicians {
      name
      musicianImage
      bands
    }
  }
}
`;

export const SEARCH_DETAILS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      price
      description
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;



export const GET_GUITAR_DETAILS = gql`
  query GuitarDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      description
      price
      image
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;
