import SCIMMY from 'scimmy';
describe('Schema tests', () => {

  test('should validate that extended schema names adhere to the SCIM standared', async () => {

    await expect(async () => {
      new SCIMMY.Types.SchemaDefinition('Agent', 'urn:selfserve:params:scim:schemas:agent:2.0:User', 'Agent', [

        new SCIMMY.Types.Attribute('string', 'agency', { required: false, description: 'agency field' }),

      ]);
    }).rejects.toThrow('Invalid SCIM schema URN namespace \'urn:selfserve:params:scim:schemas:agent:2.0:User\' in SchemaDefinition instantiation');
  });
});
