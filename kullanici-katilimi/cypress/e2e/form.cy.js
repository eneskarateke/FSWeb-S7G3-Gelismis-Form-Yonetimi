// describe("My First Test", () => {
//   it("isim inputunu alın ve bir isim yazın.", () => {
//     cy.visit("http://localhost:3000");

//     // Get an input, type into it
//     cy.get("#formData-name").type("enes");

//     //  Verify that the value has been updated
//     cy.get("#formData-name").should("have.value", "enes");
//   });
// });

// describe("My Second Test", () => {
//   it("email inputunu alın ve bir email adresi girin.", () => {
//     cy.visit("http://localhost:3000");

//     // Get an input, type into it
//     cy.get("#formData-email").type("eneskarateke@gmail.com");

//     //  Verify that the value has been updated
//     cy.get("#formData-email").should("have.value", "eneskarateke@gmail.com");
//   });
// });

// describe("My third Test", () => {
//   it("şifre inputunu alın ve bir şifre girin", () => {
//     cy.visit("http://localhost:3000");

//     // Get an input, type into it
//     cy.get("#formData-password").type("eneshamza07");

//     //  Verify that the value has been updated
//     cy.get("#formData-password").should("have.value", "eneshamza07");
//   });
// });

// describe("My fourth Test", () => {
//   it("Kullanıcının kullanım koşulları kutusunu işaretlediğini kontrol edecek bir test oluşturun", () => {
//     cy.visit("http://localhost:3000");

//     // Get an input, type into it
//     cy.get("#formData-checkbox").check();

//     //  Verify that the value has been updated
//     cy.get("#formData-checkbox").should("be.checked");
//   });
// });

// describe("My Form Tests", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000");
//   });

//   describe("Name Field", () => {
//     it("should allow the user to enter a name", () => {
//       cy.get("#formData-name").type("enes");
//       cy.get("#formData-name").should("have.value", "enes");
//     });
//   });

//   describe("Email Field", () => {
//     it("should allow the user to enter an email address", () => {
//       cy.get("#formData-email").type("eneskarateke@gmail.com");
//       cy.get("#formData-email").should("have.value", "eneskarateke@gmail.com");
//     });
//   });

//   describe("Password Field", () => {
//     it("should allow the user to enter a password", () => {
//       cy.get("#formData-password").type("eneshamza07");
//       cy.get("#formData-password").should("have.value", "eneshamza07");
//     });
//   });

//   describe("Checkbox Field", () => {
//     it("should allow the user to check the terms of use box", () => {
//       cy.get("#formData-checkbox").check();
//       cy.get("#formData-checkbox").should("be.checked");
//     });
//   });
// });

// describe("My Form Tests", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000");
//   });

//   describe("Form Fields", () => {
//     it("should allow the user to fill in all required fields", () => {
//       cy.get("#formData-name").type("enes");
//       cy.get("#formData-email").type("eneskarateke@gmail.com");
//       cy.get("#formData-password").type("eneshamza07");
//       cy.get("#formData-checkbox").check();

//       cy.get("#formButton").should("not.be.disabled");
//       cy.get("#formButton").click();
//       cy.get("#success-message").should("be.visible");
//     });
//   });
// });

describe("Hata mesajı", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  describe("Form Fields", () => {
    it("alanlar boş kaldığında", () => {
      cy.get("#formData-name").type("enes");
      cy.get("#formData-email").type("eneskarateke@gmail.com");
      cy.get("#formData-password").type("eneshamza07");
      cy.get("#formData-checkbox").check();

      cy.get("#formButton").should("be.disabled");

      cy.get("#formData-name").clear();
      cy.get("#formData-email").clear();
      cy.get("#formData-password").clear();
      cy.get("#formData-checkbox").uncheck();

      cy.contains("Lütfen isminizi girin.").should("be.visible");
      cy.contains("Lütfen email adresinizi girin.").should("be.visible");
      cy.contains("Lütfen bir şifre girin.").should("be.visible");
      cy.contains("Kullanım şartlarını kabul etmelisiniz.").should(
        "be.visible"
      );

      cy.get("#formData-name").type("e n ");
      cy.get("#formData-email").type("eneskarate");
      cy.get("#formData-password").type("eneshamza07");
      cy.get("#formData-checkbox").check();

      cy.contains("İsim alanı boşluk içeremez.").should("be.visible");
      cy.contains("Lütfen geçerli bir email adresi girin.").should(
        "be.visible"
      );

      cy.contains(
        "Şifre en az 8 karakter, bir büyük harf, bir rakam ve bir özel karakter içermelidir."
      ).should("be.visible");

      cy.get("#formData-name").clear();
      cy.get("#formData-email").clear();
      cy.get("#formData-password").clear();
      cy.get("#formData-checkbox").uncheck();

      cy.get("#formData-name").type("enes");
      cy.get("#formData-email").type("eneskarateke@gmail.com");
      cy.get("#formData-password").type("eneshamza07E@");
      cy.get("#formData-checkbox").check();

      cy.get("#formButton").click();
    });
  });
});
