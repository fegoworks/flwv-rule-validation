# Rule Validation System
### Getting Started: 
  Clone the repository and cd into the created folder using the commands below:\
    git clone https://github.com/razaqfatiu/flutterwave.git \
    cd flutterwave

### Install Dependencies
    npm install
  
### Running Locally
    npm run start:dev

### Working with the API
   #### server: http://localhost:8888
    
  - base route: 
     - `GET / ` { this returns my user data}
  - validation route: 
     - `POST /validate-rule `

#### Request body:
   
   Parameter | Type | Description
   --- | --- | ---
   `rule` | object | This should contain 3 fields: field `string`, condition, string`[eq, neq, gt, gte, contains]`, condition_value: `number`
   `data` | JSON object or array or string | This should contain the field parameter on the rule
        
   Sample request body: 
   ```javascript {
     {
      "rule": {
        "field": "missions"
        "condition": "gte",
        "condition_value": 30
      },
      "data": {
        "name": "James Holden",
        "crew": "Rocinante",
        "age": 34,
        "position": "Captain",
        "missions": 45
      }
     }
     
