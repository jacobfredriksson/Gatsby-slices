import dotenv from 'dotenv'

dotenv.config({path: '.env'});

export default {
  siteMetadata: {
    title: `Slicks slices`,
    siteUrl: `https://gatsby.pizza`,
    description: 'The best pizza place in Stockholm'
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '3mejppzs',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      }
    }
  ]
}