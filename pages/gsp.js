import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../apollo/client';

const TODOS_QUERY = gql`
  query TodoQuery {
    todos {
      _id
      task
    }
  }
`;

export default function gsp() {
  const {
    data: { todos },
  } = useQuery(TODOS_QUERY);

  return (
    <div>
      {todos.map(({ _id, task }) => (
        <div key={_id}>todo: {task}</div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: TODOS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
