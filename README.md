# FlexMoney Yoga Classes Assignment

### The ER Diagram Of the project

![image](https://user-images.githubusercontent.com/86093882/207529187-84425d2b-7c63-4261-963e-e21fc3a98f97.png)


### The project is divided into three section

1. Registration form
2. Making Payment
3. Confirmation and Database storage

Frontend is made with Handlebars a Javascript based templating engine.

### Registration Page

1. User need to fill their basic details.
2. Any user age between 18 - 65 can register on the portal.
3. After successful registration of new user, you get redirected to payment page.

![image](https://user-images.githubusercontent.com/86093882/207528034-c9dcf3d6-5538-41b9-b769-50ee1e39a0ac.png)

### Payment Page

1. After successful registration, user need to pay a fixed amount of INR 500/-.
2. User need to fill the card detail.
3. After filling correct information, payment will be successful and confirmation message is shown.
![image](https://user-images.githubusercontent.com/86093882/207528249-fff52f33-823a-4a0f-886e-bfaff075139b.png)


### Confirmation Page

After successful payment, a comfirmation will be shown.
![image](https://user-images.githubusercontent.com/86093882/207528437-a7d025cc-4fc1-4047-be6a-f7bb09ec9f24.png)


### Database

After successful payment, user data is stored in the mongodb database.
Data includes name, email, password, phone, age, Batch timing.

## Important Assumptions made

1. There is no need of login and verification, just register and pay and you get your slot.
2. Every user have a unique ID which will be used to access the service within slot.
3. Payment detail is not stored just shown there.
4. By clicking on Payment button, payment will be successful.
5. Validity of one time payment is till last day of the month.
6. User need to register and make payment again for booking a new slot.
7. User cannot book more than one time in a month to avoid clash with other slot.
8. 10 digit mobile no validation.
9. The validation is done for the registration page only.
