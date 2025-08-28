🎸 Online Guitar Shop

A React-based web application for browsing guitar brands, models, and details.
Supports multi-language translations, search, filters, sorting, and infinite scrolling.

🚀 Tech Stack

React 18 + Vite (or CRA, depending on your setup)

React Router for routing

Apollo Client for GraphQL queries

TailwindCSS for styling

i18n context for translations (English & Albanian included)

Infinite scroll for loading more results

🛠️ Getting Started
# 1. Clone the repo
git clone https://github.com/Drilon02/guitar-shop.git
cd guitar-shop

# 2. Install dependencies
npm install
 or
yarn install

# 3. Configure environment

Create a .env file in the root with your GraphQL endpoint:

VITE_GRAPHQL_ENDPOINT=https://graphql-api-brown.vercel.app/api/graphql


Inside src/graphql/apolloClient.js make sure it uses:

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

# 4. Run the app
npm run dev
or
yarn dev


App will be available at:
👉 http://localhost:5173
