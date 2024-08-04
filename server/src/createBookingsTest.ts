const authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsIm5hbWUiOiJBZG1pbjEiLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTcxODUzOTcwMywiZXhwIjoxNzE4NTQzMzAzfQ.LHps1yREvp8rJkNU3Q4UpAeNy2D-8KdSOfmNPr91axk";

const headers = {
  "authorization": authorization,
  "content-type": "application/json",
};
  
const query = `
  mutation createBooking($bookingInput: BookingInput!) {
    createBooking(bookingInput: $bookingInput) {
      id
    }
  }
`;  
 
  const operationName = "createBooking";
  
  let count = 0;
  let seats = 5;
  
  const intervalId = setInterval(() => {
    if (count >= 180) {
      clearInterval(intervalId);
      return;
    }  
    const variables = {
      "bookingInput": {
        "eventId": 23,
        "seats": [seats]
      }
    };
    console.log(`Making request #${count+1} with seats: ${seats}`);  
    callBookingMutation(variables);    
    count++;
    seats++;
  }, 1000);

function callBookingMutation(variables: { bookingInput: { eventId: number; seats: number[]; }; }) {
    fetch("http://localhost:3000/graphql", {
        headers,
        "body": JSON.stringify({ query, variables, operationName }),
        "method": "POST"
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Response for request #${count + 1}:`, data);
    })
    .catch(error => {
        console.error(`Error for request #${count + 1}:`, error);
    });
}
