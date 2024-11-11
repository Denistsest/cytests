class SignIn {

  btnCWE(){
    return cy.get('[type="submit"]')
  }
  
  btnCa(){
    return cy.get('button[type="submit"]')
  }

  emailField(){
    return  cy.get('input[type="email"]')
  }

  passField(){
    return  cy.get('input[name="new_password"]')
  }

  confpassField(){
    return  cy.get('input[name="confirmed_password"]')
  }

  registerbtn(){
    return cy.get('[data-testid="header-sign-up-button"]')
  }

  emailalert(){
    return cy.get('div[id="username-note"]')
  }

 
  curtime() {
      var now = new Date();
      var day = now.getDate().toString().padStart(2, '0');
      var month = (now.getMonth() + 1).toString().padStart(2, '0');
      var year = now.getFullYear().toString();
      var hours = now.getHours().toString().padStart(2, '0');
      var minutes = now.getMinutes().toString().padStart(2, '0');
      var seconds = now.getSeconds().toString().padStart(2, '0');
      var milliseconds = now.getMilliseconds().toString().padStart(3, '0');
  
      return Number(day + month + year + hours + minutes + seconds + milliseconds);
    }


}
describe('Sign In', () => {
  const signin = new SignIn()
  it('passes', () => {
    var email = 'testd+' + signin.curtime() + '@gmail.com'
    cy.viewport(1920, 1080)
    cy.visit('https://www.booking.com/')
    signin.registerbtn().should('be.visible').click()
    signin.emailField().type(email).should('have.value',email)
    signin.btnCWE().should('be.visible').click()
    signin.passField().type('Aurora1_!wq').should('have.value','Aurora1_!wq')
    signin.confpassField().type('Aurora1_!wq').should('have.value','Aurora1_!wq')
    signin.btnCWE().click()
    cy.get('div[class="access-container bui_font_body"]').contains('Let\'s make sure you\'re human')
  })
})

describe('registration flow with shared email ', () => {

  const signin = new SignIn()
  var sharedemail = 'tesdt+23@gmail.com'
  it('passes', () => {
    cy.visit('https://account.booking.com/sign-in')
    signin.btnCWE().should('be.visible').click()  
    signin.emailField().type(sharedemail).should('have.value',sharedemail)
    signin.btnCWE().click()
    cy.url().should('eq','https://account.booking.com/sign-in/password')
    cy.contains(sharedemail).should('be.visible')
  })
})

describe('Check email field validation', () => {
  const signin = new SignIn()
  it('checks', () => {
  cy.visit('https://account.booking.com/sign-in')
  signin.btnCWE().should('be.visible').click() 
  signin.emailalert().contains('Enter your email address')
  signin.emailField().type('asdasd').should('have.value','asdasd')
  signin.emailalert().contains('Make sure the email address you entered is correct.')
  })
}
)

describe('Check password field validation', () => {
  const signin = new SignIn()
  var email = 'testd+' + signin.curtime() + '@gmail.com'
  it('checks', () => {
  cy.visit('https://account.booking.com/sign-in')
  signin.btnCWE().should('be.visible').click() 
  signin.emailField().type(email).should('have.value',email)
  signin.btnCWE().click()
  cy.url().should('eq','https://account.booking.com/register/password')
  signin.confpassField().type('1wq').should('have.value','1wq')
  signin.confpassField().clear()
  signin.btnCa().click()
  cy.get('div[id="new_password-note"]').contains('Please enter your new password')
  signin.passField().type('wq').should('have.value','wq')
  signin.confpassField().type('wq').should('have.value','wq')
  cy.get('div[id="new_password-note"]').contains('Your password must be at least 10 characters')
  signin.passField().clear()
  signin.confpassField().clear()
  signin.passField().type('wqqwqwweqw').should('have.value','wqqwqwweqw')
  signin.confpassField().type('wqqwqwweqw').should('have.value','wqqwqwweqw')
  cy.get('div[id="new_password-note"]').contains('Your password must include at least one number')
  signin.passField().clear()
  signin.confpassField().clear()
  signin.passField().type('QWSAQSQDDD1').should('have.value','QWSAQSQDDD1')
  signin.confpassField().type('QWSAQSQDDD1').should('have.value','QWSAQSQDDD1')
  cy.get('div[id="new_password-note"]').contains('Your password must include at least one lowercase letter')
  signin.passField().clear()
  signin.confpassField().clear()
  signin.passField().type('wqqwqwweqw1').should('have.value','wqqwqwweqw1')
  signin.confpassField().type('wqqwqwweqw1').should('have.value','wqqwqwweqw1')
  cy.get('div[id="new_password-note"]').contains('Your password must include at least one uppercase letter')
  signin.passField().clear()
  signin.confpassField().clear()
  signin.passField().type('wqqwqwweqw1Q').should('have.value','wqqwqwweqw1Q')
  signin.confpassField().type('wqqwqwweqw1Q').should('have.value','wqqwqwweqw1Q')
  signin.btnCa().click()
  cy.get('div[class="access-container bui_font_body"]').contains('Are you a robot?')
  })
}
)

describe('Check confirmed password field validation', () => {
  const signin = new SignIn()
  var email = 'testd+' + signin.curtime() + '@gmail.com'
  it('checks', () => {
    cy.visit('https://account.booking.com/sign-in')
    signin.btnCWE().should('be.visible').click() 
    signin.emailField().type(email).should('have.value',email)
    signin.btnCWE().click()  
    cy.url().should('eq','https://account.booking.com/register/password')   
    signin.btnCa().click()
    cy.get('div[id="confirmed_password-note"]').contains('Confirm your password')
    signin.passField().type('wq').should('have.value','wq')
    signin.confpassField().type('1wq').should('have.value','1wq')
    cy.get('div[id="confirmed_password-note"]').contains('The passwords you entered didn\'t match – try again')
    })
  }
  )

  describe('Check components on sign-in page', () => {
    const signin = new SignIn()
    var email = 'testd+' + signin.curtime() + '@gmail.com'
    it('checks', () => {  
      cy.viewport(1920, 1080)
      cy.visit('https://account.booking.com/sign-in')
      cy.get('a[aria-label="Sign in | Booking.com"]').should('have.attr', 'href', '/sign-in')
      cy.get('button[data-testid="header-language-picker-trigger"]').should('be.visible')
      cy.get('a[aria-label="Help and support"]')
      .should('have.attr', 'href', 'https://secure.booking.com/content/cs.en-us.html?aid=304142')
      cy.get('div.page-header').contains( 'Sign in or create an account')
      signin.emailField().should('be.visible')
      signin.btnCWE.should('be.visible')
      cy.get('[title="Sign in with Google"]').should('have.attr', 'href', '/social/consent/google')
      cy.get('[title="Sign in with Apple"]').should('have.attr', 'href', '/social/consent/apple')
      cy.get('[title="Sign in with Facebook"]').should('have.attr', 'href', '/social/consent/facebook')
      cy.get('[class="Y2GrMepHg4YXB1IIqu9a UE8Xzvf8uvOHuxCap9fq bui_color_action nw-terms YyYzJ7AivwcR7QxFB55f"]')
      .should('have.attr', 'href', 'https://www.booking.com/content/terms.en-us.html?aid=304142')
      cy.get('[class="Y2GrMepHg4YXB1IIqu9a UE8Xzvf8uvOHuxCap9fq bui_color_action nw-privacy YyYzJ7AivwcR7QxFB55f"]')
      .should('have.attr', 'href', 'https://www.booking.com/content/privacy.en-us.html?aid=304142')
    }
  )
})

describe('Check components on register/password page', () => {
  const signin = new SignIn()
  var email = 'testd+' + signin.curtime() + '@gmail.com'
  it('checks', () => {  
    cy.viewport(1920, 1080)
    cy.visit('https://account.booking.com/sign-in')
    signin.btnCWE().should('be.visible').click() 
    signin.emailField().type(email).should('have.value',email)
    signin.btnCWE().click()  
    cy.url().should('eq','https://account.booking.com/register/password') 
    cy.get('a[aria-label="Sign in | Booking.com"]').should('have.attr', 'href', '/sign-in')
    cy.get('button[data-testid="header-language-picker-trigger"]').should('be.visible')
    cy.get('a[aria-label="Help and support"]').should('have.attr', 'href', 'https://secure.booking.com/content/cs.en-us.html?aid=304142')
    cy.get('div.page-header').contains( 'Create password')
    cy.get('div.page-header').contains( 'Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers.')
    signin.passField().should('be.visible')
    signin.confpassField().should('be.visible')
    signin.btnCa().should('be.visible')
    cy.get('[class="Y2GrMepHg4YXB1IIqu9a UE8Xzvf8uvOHuxCap9fq bui_color_action nw-terms YyYzJ7AivwcR7QxFB55f"]')
    .should('have.attr', 'href', 'https://www.booking.com/content/terms.en-us.html?aid=304142')
    cy.get('[class="Y2GrMepHg4YXB1IIqu9a UE8Xzvf8uvOHuxCap9fq bui_color_action nw-privacy YyYzJ7AivwcR7QxFB55f"]')
    .should('have.attr', 'href', 'https://www.booking.com/content/privacy.en-us.html?aid=304142')
  }
)
})