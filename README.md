# accounting-software

## PHASE 1: Brainstorm and build a simplified version of accounting software
- The database design
```
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
