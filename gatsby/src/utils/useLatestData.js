import  {useState, useEffect} from 'react'

const gql = String.raw

const deets = gql`
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`;

const initialState = {
  hotSlices: [],
  sliceMasters: []
}

export const useLatestData = () => {
  const [state, setState] = useState(initialState)

  useEffect(() => {

    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: gql`
          query	{
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `
      })
    }).then(res => res.json()).then(res => {
      //Check for errors
      console.log(res)
      setState({
        hotSlices: res.data.StoreSettings.hotSlices,
        slicemasters: res.data.StoreSettings.slicemasters
      })
    }).catch(err => console.log({err}))
  }, []);
  return {
    state
  }

}