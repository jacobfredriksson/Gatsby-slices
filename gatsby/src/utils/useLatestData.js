import  {useState, useEffect} from 'react'

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
        query: `
          query	{
            StoreSettings(id: "downtown") {
              name
              slicemasters {
                name
              }
              hotSlices {
                name
              }
            }
          }
        `
      })
    }).then(res => res.json()).then(res => {
      //Check for errors

      setState({
        hotSlices: res.data.StoreSettings.hotSlices,
        slicemasters: res.data.StoreSettings.slicemasters
      })
    });
  }, []);
  return {
    state
  }

}