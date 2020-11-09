const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// THIS IS A PROOF OF CONCEPT - long term these schemas and data won't sit all in this file
// most likely.

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Devices {
    deviceId: String
    displayName: String
    deviceManufacturer: String
    deviceModel: String
    isDefault: Boolean
  }

  type Patients {
    patientId: String
    firstName: String
    middleName: String
    lastName: String
    birthDate: String
    address: String
    phone: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    devices: [Devices]
    patients: [Patients]
  }
`;

const devices = [
  {
    deviceId: "deviceId2",
    displayName: "BD Veritor",
    deviceManufacturer: "BD",
    deviceModel: "Veritor",
    isDefault: true,
  },
  {
    deviceId: "deviceId3",
    displayName: "Abbott Binax Now",
    deviceManufacturer: "Abbott",
    deviceModel: "Binax Now",
    isDefault: false,
  },
];

const patients = [
  {
    patientId: "patientId1",
    firstName: "Edward",
    middleName: "",
    lastName: "Teach",
    birthDate: "01/01/1717",
    address: "123 Plank St, Nassau",
    phone: "(123) 456-7890",
  },
  {
    patientId: "patientId2",
    firstName: "James",
    middleName: "D.",
    lastName: "Flint",
    birthDate: "01/01/1719",
    address: "456 Plank St, Nassau",
    phone: "(321) 546-7890",
  },
  {
    patientId: "patientId3",
    firstName: "John",
    middleName: "'Long'",
    lastName: "Silver",
    birthDate: "01/01/1722",
    address: "789 Plank St, Nassau",
    phone: "(213) 645-7890",
  },
  {
    patientId: "patientId4",
    firstName: "Sally",
    middleName: "Mae",
    lastName: "Map",
    birthDate: "01/01/1922",
    address: "789 Road St, Nassau",
    phone: "(243) 635-7190",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    devices: () => devices,
    patients: () => patients,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
