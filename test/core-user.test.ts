import SCIMMY from 'scimmy';
describe('User tests', () => {

  function ingress(_resource: any, data: any) {

    const clonedData = { ...data, id: '2000' };
    return clonedData;
  }

  beforeAll(() => {
    SCIMMY.Resources.declare(SCIMMY.Resources.User)
      .ingress(ingress)
      .egress((resource: any) => {/* Your handler for retrieving user resources */ console.log('egres' + resource); })
      .degress((resource: any) => {/* Your handler for deleting user resources */console.log('degress' + resource); });

  });

  test('should validate User against the schema', async () => {

    await (new SCIMMY.Resources.User()).write({
      userName: 'someGuy', externalId: '5667',
    },
    );
  });

  test('should throw an error when field is missing from the schema', async () => {

    await expect(async () => {
      await (new SCIMMY.Resources.User()).write({ displayName: 'test' });

    }).rejects.toThrow('Required attribute \'userName\' is missing');

  });

  test('should NOT throw an error when email is wrong format', async () => {

    await (new SCIMMY.Resources.User()).write(
      {
        userName: 'someGuy',
        externalId: '5667',
        emails: [
          {
            value: 'dschrute!gmail',
            type: 'work',
            primary: true,
          },
        ],
      },

    );
  });

  test('should NOT throw an error when invalid field is added', async () => {

    await (new SCIMMY.Resources.User()).write(
      {
        userName: 'someGuy',
        externalId: '5667',
        fakeField: 'fake',
        emails: [
          {
            value: 'dschrute!gmail',
            type: 'work',
            primary: true,
          },
        ],
      },

    );
  });

});
