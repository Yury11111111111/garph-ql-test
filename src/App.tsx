import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
      reviewsForLocation {
        comment
        location {
          name
        }
        rating
      }
    }
  }
`;
type ReviewsForLocation = {
  comment: string;
  rating: number;
}

type Location = {
  id: string;
  name: string;
  description: string;
  photo: string;
  reviewsForLocation: ReviewsForLocation[]
}


function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.locations.map((location: Location) => {
    
    const { id, name, description, photo, reviewsForLocation } = location


    return (
      <div key={id}>
        <h3>{name}</h3>
        <img
          width="400"
          height="250"
          alt="location-reference"
          src={photo}
        />
        <br />
        <b>About this location:</b>
        <p>{description}</p>
        {reviewsForLocation.map(({comment, rating}) => {
          return (
            <div>
                {comment}<br />
                <b>{rating}</b>
            </div>
          )
        })}
      </div>
    );
  });
}

export default App
