import SCIMMY from 'scimmy';
describe('Agent tests', () => {
    // Declaring a schema definition under a different name
    function ingress(_resource: any, data: any) {
        const clonedData = { ...data, id: '2000' };
        console.log('data' + JSON.stringify(clonedData));
        return clonedData;
    }

    beforeAll(() => {

        // https://scimmyjs.github.io/SCIMMY.Types.SchemaDefinition.html
        const definition = new SCIMMY.Types.SchemaDefinition('Agent', 'urn:ietf:params:scim:schemas:domain:Agent', 'Agent', [

            //https://scimmyjs.github.io/SCIMMY.Types.Attribute.html
            new SCIMMY.Types.Attribute('string', 'admin', { required: true, description: 'admin field' }),
            new SCIMMY.Types.Attribute('complex', 'agencies', { required: true, description: 'agencies array field', multiValued: true, direction: 'both' }, [

                new SCIMMY.Types.Attribute('string', 'name', { required: true, description: 'admin field' }),
            ]),
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

    // test('testing the attribute', () => {

    //     const sch = SCIMMY.Schemas.declared('Agent');
    //     console.log(JSON.stringify(sch));

    //     const attr = sch.attribute('agencies');

    //     console.log(JSON.stringify(attr));

    //     const value = attr.coerce(['value_test']);
    //     console.log('v' + value)
    // })

    test('should validate true when Agent has extended attributes', async () => {


        await (new SCIMMY.Resources.User())
            .write({
                'userName': 'someGuy',
                'externalId': '5667',
                'emails': [
                    {
                        value: 'dschrute@example.com',
                        type: 'work',
                        primary: true,
                    },
                ],

                'schemas': ['urn:ietf:params:scim:schemas:domain:Agent', 'urn:ietf:params:scim:schemas:core:2.0:User'],
                'urn:ietf:params:scim:schemas:domain:Agent': {
                    admin: 'test-admin',
                    agencies: []
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

        }).rejects.toThrow('Required attribute \'admin\' is missing in schema extension \'urn:ietf:params:scim:schemas:domain:Agent\'');

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
