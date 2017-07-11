# Karma web project

## Entities
1. **Company** - A corporate instance which will house accounts, promotions, products, etc.
2. **Account** - A member of a company who can credit/debit karma
3. **Team** - An organizational unit for accounts
4. **Product** - A physical object, event, reward, etc. which may be purchased with karma
5. **Category** - A way to organize products into clusters

## Company
> A corporate instance which will house accounts, promotions, products, etc.
### Properties
* Name - The name of the company
* Domain - The TLD of the company (doubledutch.me, google.com, etc.)
* Contact - Contact information for the company administrator
    * FirstName
    * LastName
    * EmailAddress
    * PhoneNumber
* Settings - Configurable options for the company
    * KarmaTotalPrivate - true/false
    * KarmaToGive - Karma which may be donated to co-workers
        * Interval - disabled, daily, weekly, bi-weekly, monthly
        * Amount - How many karma points to grant each (interval) for donation
    * Notifications
        * KarmaToGiveReminderInterval - disabled, daily, weekly
* Created
* Disabled

### Commands
* CreateCompany
* DisableCompany
* ChangeCompanyDetails
* ChangeKarmaSettings
* ChangeNotificationSettings

### Events
* CompanyCreated
* CompanyDisabled
* CompanyNameChanged
* CompanyDomainChanged
* CompanyAccountAdded
* CompanyAccountRemoved
* CompanySettingsKarmaPrivacyChange
* CompanySettingsKarmaIntervalChanged
* CompanySettingsKarmaAmountChanged
* CompanyContactChanged

## Account
> ...
### Properties
* CompanyID
* TeamID
* Role - admin, manager, employee
* FirstName
* LastName
* EmailAddress
* Provider
* Balance
* LastLogin
* Settings
    * Notifications
        * Enabled - true/false
        * PraiseNotificationEnabled - true/false
        * CreditNotificationEnabled - true/false
        * DigestNotificationEnabled - true/false
* Created
* Disabled

### Commands
* CreateAccount
* DisableAccount
* ChangeAccountTeam
* ChangeAccountDetails
* ChangeAccountNotifications
* GivePraise
* PurchaseProduct

### Events
* AccountCreated
* AccountDisabled
* AccountLoggedIn
* AccountTeamAdded
* AccountTeamRemoved
* Personal
    * AccountNameChanged
    * AccountTitleChanged
    * AccountNotificationsChanged
* Transactional
    * AccountDebited
    * AccountCredited
    * AccountPurchasedProduct
* Morale
    * AccountGavePraise
    * AccountReceivedPraise
    * AccountGaveFeedback - (maybe?)

## Team
> ...
### Properties
* CompanyID
* Name
* Description
* Created
* Disabled
### Events
* TeamCreated
* TeamDisabled
* TeamNameChanged
* TeamDescriptionChanged
* TeamAccountAdded
* TeamAccountRemoved

## Product
> ...
### Properties
* CompanyID
* CategoryID
* Name
* Description
* Cost
* Quantity
* Created
* Disabled
### Events
* ProductCreated
* ProductDisabled
* Descriptive
    * ProductCategoryAdded
    * ProductCategoryRemoved
    * ProductNameChanged
    * ProductDescriptionChanged
    * ProductCostChanged
    * ProductAmountChanged
* Transactional
    * ProductPurchased
    * ProductReturned

## Category
> ...
### Properties
* CompanyID
* ParentCategoryID
* Name
* Description
* Created
* Disabled
### Events
* CategoryCreated
* CategoryDisabled
* CategoryParentAdded
* CategoryParentRemoved
* CategoryProductAdded
* CategoryProductRemoved