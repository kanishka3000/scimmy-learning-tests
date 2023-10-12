import SCIMMY from 'scimmy';
describe('Agent tests', () => {
    // Declaring a schema definition under a different name
    function ingress(_resource: any, data: any) {
        const clonedData = { ...data, id: '2000' };
        return clonedData;
    }

    beforeAll(() => {

        const definition = new SCIMMY.Types.SchemaDefinition('Agent', 'urn:ietf:params:scim:schemas:domain:Agent', 'Agent', [

            new SCIMMY.Types.Attribute('string', 'admin', { required: false, description: 'admin field' }),
        ]);

        class AgentSchema extends SCIMMY.Types.Schema {
            static get definition() {
                return definition;
            }
        }

        SCIMMY.Resources.declare(SCIMMY.Resources.User.extend(AgentSchema, true))
            .ingress(ingress);

        const u = SCIMMY.Resources.declared();
        console.log('us' + JSON.stringify(u));
    });

    test('should validate true when Agent has extended attributes', async () => {


        await (new SCIMMY.Resources.User()).write({
            'userName': 'someGuy',
            'externalId': '5667',

            'schemas': ['urn:ietf:params:scim:schemas:domain:Agent', 'urn:ietf:params:scim:schemas:core:2.0:User'],
            'urn:ietf:params:scim:schemas:domain:Agent': {
                admin: 'testagency',
            },
        },
        );
    });

    test('should validate false when Agent has different extended attributes', async () => {

        await expect(async () => {
            await (new SCIMMY.Resources.User()).write({
                'userName': 'someGuy',
                'externalId': '5667',

                'schemas': ['urn:ietf:params:scim:schemas:domain:Agent', 'urn:ietf:params:scim:schemas:core:2.0:User'],
                'urn:ietf:params:scim:schemas:domain:Agent': {
                    fakeAttribute: 'testagency',
                },
            },
            );

        }).rejects.toThrow('Missing values for required schema extension \'urn:ietf:params:scim:schemas:domain:Agent\'');

    });

    test('should validate false when Agent has no extended attributes', async () => {

        await expect(async () => {
            await (new SCIMMY.Resources.User()).write({
                userName: 'someGuy',
                externalId: '5667',

                schemas: ['urn:ietf:params:scim:schemas:domain:Agent', 'urn:ietf:params:scim:schemas:core:2.0:User'],
            },
            );

        }).rejects.toThrow('Missing values for required schema extension \'urn:ietf:params:scim:schemas:domain:Agent\'');

    });

});
