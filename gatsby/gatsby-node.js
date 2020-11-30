import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch'

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the URL for this new page??
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

const turnToppingsIntoPages = async ({ graphql, actions }) =>{
  const toppingTemplate = path.resolve('./src/pages/pizzas.js')
  const { data } = await graphql(`
    query {
      topping: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);

  data.topping.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`
      },
    })
  })
}

const fetchBeersAndTurnIntoNodes = async ({actions, createNodeId, createContentDigest}) => {
  console.log('🍻 turn beers into nodes! ')
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json()

  console.log(beers)
  for (const beer of beers) {

    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      }
    }
    actions.createNode({
      ...beer,
      ...nodeMeta
    })
  }


}

const turnSlicemasterIntoPage = async ({graphql, actions}) => {
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount,
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `)

  data.slicemasters.nodes.forEach(slicemaster => {
    actions.createPage({
      component: resolve('./src/templates/Slicemaster.js'),
      path: `/slicemaster/${slicemaster.slug.current}`,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      }
    })
  })

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize)
  console.log(
    `There are ${data.slicemasters.totalCount} total people. And we have ${pageCount} pages with ${pageSize} per page`
  );

  Array.from({ length: pageCount}).forEach((_, i) => {
    console.log(`Creating page ${i}`)
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      }
    })
  })

}

export const sourceNodes = async (params) => {
  // await Promise.all([fetchBeersAndTurnIntoNodes(params)])
}

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemasterIntoPage(params)
  ])
}



