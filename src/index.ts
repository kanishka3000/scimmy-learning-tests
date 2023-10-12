import SCIMMY from 'scimmy';


// const scimInput = {
//   // schemas: [
//   //   "urn:ietf:params:scim:schemas:core:2.0:User"
//   // ],
//   // id: "2819c223-7f76-453a-919d-413861904646",
//   // externalId: "dschrute",
//   // meta: {
//   //   resourceType: "User",
//   //   created: "2011-08-01T18:29:49.793Z",
//   //   lastModified: "2011-08-01T18:29:49.793Z",
//   //   location: "https://example.com/v2/Users/2819c223...",
//   //   version: "W/\"f250dd84f0671c3\""
//   // },
//   userName: "dschrute",
//   // name: {
//   //   formatted: "Mr. Dwight K Schrute, III",
//   //   familyName: "Schrute",
//   //   givenName: "Dwight",
//   //   middleName: "Kurt",
//   //   honorificPrefix: "Mr.",
//   //   honorificSuffix: "III"
//   // },
//   // emails: [
//   //   {
//   //     value: "dschrute@example.com",
//   //     type: "work",
//   //     primary: true
//   //   }
//   // ],
//   // phoneNumbers: [
//   //   {
//   //     value: "555-555-8377",
//   //     type: "work"
//   //   }
//   // ]
// }


// // Define a TypeScript interface to represent the SCIM User schema
// interface ScimUser {
//   schemas: string[];
//   id: string;
//   userName: string;
//   name: {
//     givenName: string;
//     familyName: string;
//   };
//   // Add other properties as needed
// }

SCIMMY.Resources.declare(SCIMMY.Resources.User)
  .ingress((resource: any, data: any) => { console.log('ing' + JSON.stringify(resource)); console.log('data' + JSON.stringify(data)); return data; })
  .egress((resource: any) => {/* Your handler for retrieving user resources */ console.log('egres' + resource); })
  .degress((resource: any) => {/* Your handler for deleting user resources */console.log('degress' + resource); });

SCIMMY.Schemas.User.definition.truncate(['displayName', 'nickName', 'profileUrl', 'title',
  'userType', 'preferredLanguage', 'locale', 'timezone', 'active', 'password', 'ims', 'photos', 'addresses',
  'groups', 'entitlements', 'roles', 'x509Certificates', 'phoneNumbers', 'emails', 'name', 'meta',
  'schemas', 'id', 'externalId']);
// Print the first name
const declaredUser = SCIMMY.Resources.declared();
console.log('valu' + JSON.stringify(declaredUser));
export class Hello {
  public async sayHello() {
    await (new SCIMMY.Resources.User()).write({ userName: 'someGuy' });

    return 'hello, world!';
  }
}