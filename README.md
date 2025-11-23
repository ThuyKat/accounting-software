# accounting-software

## PHASE 1: Brainstorm and build a simplified version of accounting software
- The database design
```mermaid
erDiagram
    ACCOUNTS ||--o{ JOURNAL_LINES : "recorded in"
    ACCOUNTS ||--o{ BANK_ACCOUNTS : "linked to"
    JOURNAL_ENTRIES ||--o{ JOURNAL_LINES : contains
    CONTACTS ||--o{ SALES_INVOICES : generates
    CONTACTS ||--o{ PURCHASE_INVOICES : receives
    SALES_INVOICES ||--o{ INVOICE_ITEMS : contains
    PURCHASE_INVOICES ||--o{ INVOICE_ITEMS : contains
    PRODUCTS ||--o{ INVOICE_ITEMS : "listed in"
    PRODUCTS ||--o{ INVENTORY_TRANSACTIONS : affects
    BANK_ACCOUNTS ||--o{ BANK_TRANSACTIONS : contains
    TAX_CODES ||--o{ INVOICE_ITEMS : "applied to"
    PAYMENTS }|--|| BANK_ACCOUNTS : "processed through"
    PAYMENTS }|--|| CONTACTS : "made by/to"
    FISCAL_YEARS ||--o{ FISCAL_PERIODS : contains
    USERS }|--|| ROLES : assigned
    ROLES }o--o{ PERMISSIONS : has
    
    ACCOUNTS {
        int account_id PK
        string account_code
        string account_name
        enum account_type
        int parent_account_id FK
    }
    
    JOURNAL_ENTRIES {
        int journal_entry_id PK
        string entry_number
        date entry_date
        enum status
        int user_id FK
    }
    
    JOURNAL_LINES {
        int line_id PK
        int journal_entry_id FK
        int account_id FK
        decimal debit_amount
        decimal credit_amount
        int tax_code_id FK
    }
    
    CONTACTS {
        int contact_id PK
        enum contact_type
        string business_name
        string tax_number
        int billing_address_id FK
        int payment_terms_id FK
    }
    
    SALES_INVOICES {
        int invoice_id PK
        string invoice_number
        int customer_id FK
        date invoice_date
        date due_date
        enum status
        decimal total
    }
    
    PURCHASE_INVOICES {
        int purchase_invoice_id PK
        string supplier_invoice_number
        int supplier_id FK
        date invoice_date
        enum status
        decimal total
    }
    
    PRODUCTS {
        int product_id PK
        string code
        string name
        enum product_type
        decimal sales_price
        decimal purchase_price
        int sales_account_id FK
        int purchase_account_id FK
    }
    
    BANK_ACCOUNTS {
        int bank_account_id PK
        int account_id FK
        string bank_name
        string account_number
        decimal opening_balance
    }
    
    PAYMENTS {
        int payment_id PK
        date payment_date
        decimal amount
        enum payment_method
        int bank_account_id FK
        int contact_id FK
    }
    
    TAX_CODES {
        int tax_code_id PK
        string code
        decimal rate
        int tax_account_id FK
    }
    
    FISCAL_YEARS {
        int fiscal_year_id PK
        date start_date
        date end_date
        boolean is_closed
    }
    
    USERS {
        int user_id PK
        string username
        string email
        int role_id FK
    }
    
    ROLES {
        int role_id PK
        string name
    }
    
    PERMISSIONS {
        int permission_id PK
        string name
        string resource
        string action
    }
```
- **Challenges**: Ensure that multiple related transactions are processed concurrently. For example, when a sales invoice is recorded, multiple accounts including sales account, AR account, COGS, and inventory are affected.
- **Solution Options**:
    - Add function to validate double-entry to ensure journal entries are balanced
    - Event-driven architecture?
    - Consider building each module separately and connecting via APIs (Microservices approach)
        - **Advantages**: Flexibility of tech stack chosen for each module, single point of failure avoided, separation of concerns and assignments. To implement this, need to think about database design (should each module have a separate db?). In pure microservices, each service should own its own db.
        - **Disadvantages**: Database systems don't support foreign keys that reference tables in other databases
            - **Solution**: Store reference IDs without actual database constraints, duplicate necessary data to avoid cross-service queries, use events, or create a higher-level service that coordinates across domains.
- **Phase 1**:
    - Create a simple app with sales/purchase recording buttons
    - Basic input form for amount and description
    - Preview of double-entry before confirming
    - Update account balances when transactions are recorded
    - Product entity with basic details
    - Dropdown selection of product when recording transaction
    - Auto inventory quantity adjustment
    - Basic reporting of product quantity
    - Basic check if debits equal credits
    - Incorporate AI as much as possible and test around
- **Phase 2**:
    - Create a more flexible chart of accounts structure
    - Basic financial reporting: simple trial balance, P&L, balance sheet
    - Filter transactions by date
- **Phase 3**:
    - Add contacts module with customer/vendor database
    - Track outstanding balances
    - Add aging reports
- **Phase 4**:
    - Implement banking transactions and reconciliation
    - BAS (Business Activity Statement) generation
    - Add more tax details
### Learning Notes
- **Sequelize library**: Model basics - define model, data types, options for setting createdAt and updatedAt manually, associations with other models (belongsTo, hasMany), sync model, drop model, add foreign key, how Sequelize sets table names and field names
- **Node.js**: How to build and publish your own npm library - bin/cli.js, package.json settings (need to do more projects on this!)
- **Phase 1 progress**: Set up Node.js project with Express.js, Sequelize, dbConfig to define and connect to database, create models folder and define basic accounting models and their relationships, sync models to create database tables if they don't exist
