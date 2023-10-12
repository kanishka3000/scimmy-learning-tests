import SCIMMY from 'scimmy';
describe('Schema tests', () => {

  test('should validate that extended schema names adhere to the SCIM standared', async () => {


    const schema = new SCIMMY.Types.SchemaDefinition('Agent', 'urn:ietf:params:scim:schemas:domain:Agent', 'Agent', [

      new SCIMMY.Types.Attribute('string', 'agency', { required: false, description: 'agencyfield' }),

    ]);

    const document = schema.describe();
    console.log(document);
    /*
    {
      schemas: [ 'urn:ietf:params:scim:schemas:core:2.0:Schema' ],
      id: 'urn:ietf:params:scim:schemas:domain:Agent',
      name: 'Agent',
      description: 'Agent',
      attributes: [ Attribute { type: 'string', name: 'agency', config: [Object] } ],
      meta: {
        resourceType: 'Schema',
        location: '/urn:ietf:params:scim:schemas:domain:Agent'
      }
    }

    */
    const expectedObject = '{"schemas":["urn:ietf:params:scim:schemas:core:2.0:Schema"],"id":"urn:ietf:params:scim:schemas:domain:Agent","name":"Agent","description":"Agent","attributes":[{ "name": "agency", "type": "string", "multiValued": false, "description": "agency field", "required": false, "caseExact": false, "mutability": "readWrite", "returned": "default", "uniqueness": "none" }], "meta": { "resourceType": "Schema", "location": "/urn:ietf:params:scim:schemas:domain:Agent" } }'.replace(/ /g, '');


    const receivedDocument = JSON.stringify(document);
    expect(receivedDocument).toEqual(expectedObject);


  });
});
