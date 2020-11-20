import path from 'path';

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

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params)
  ])
}