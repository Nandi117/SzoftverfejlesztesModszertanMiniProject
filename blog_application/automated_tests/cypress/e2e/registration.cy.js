
import { slowCypressDown } from 'cypress-slow-down'


const registrationUrl = "http://localhost:5173/signup";

slowCypressDown(300);


/**
 * @description Registration failed test scenario.
 * After registration failure the user still on the registrar page
 * and informed that the registration process was failed.
 * @author Bálint Molnár
 */
describe('Registration failed test', () => {
    it('Registration failed test given email and password', () => {


        cy.fixture("example.json").then((data)=>{

            const registrationData = data["registration"];
            const {username, email, password, confirm} = registrationData["failure"][0];

            cy.register(registrationUrl, username, email, password, confirm);

            cy.url().should('equal', registrationUrl);
        })

    })
});


/**
 * @description Registration successful test scenario.
 * After successful registration, the system automatically
 * redirect to the user posts page.
 * @author Bálint Molnár
 */
describe('Registration successful test', ()=>{

    it('Registration successful test given email and password', ()=>{

        cy.fixture("example.json").then((data)=>{
            const registrationData = data["registration"];
            const {username, email, password, confirm} = registrationData["success"][1];

            cy.register(registrationUrl, username, email, password, confirm)

            cy.url().should('include', '/own');
        })

    });

});
