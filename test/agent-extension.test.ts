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


        SCIMMY.Schemas.User.definition.extend([

            new SCIMMY.Types.Attribute('complex', 'agencies', { required: true, description: 'agencies array field', multiValued: true, direction: 'both' }, [

                new SCIMMY.Types.Attribute('string', 'name', { required: true, description: 'admin field' }),
            ]),
        ]);

        SCIMMY.Resources.declare(SCIMMY.Resources.User).ingress(ingress);
    });



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

                'schemas': ['urn:ietf:params:scim:schemas:core:2.0:User'],
                agencies: [{
                    name: 'raywhite'
                }]
            },
            );
    });


});
