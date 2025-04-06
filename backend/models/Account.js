import {DataType} from 'sequelize'
import sequelize from '../dbConfig.js'

const Account = sequelize.define('Account', {
    id:{
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    account_code:{
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    account_name:{
        type: DataType.STRING,
        allowNull: false
    },
    account_type:{
        type: DataType.ENUM('asset', 'liability', 'equity', 'revenue', 'expense'),
        allowNull: false
    },
    parent_account_id:{
        type: DataType.INTEGER,
        references: {
            model: 'accounts',
            key: 'id'
        }
    },
    balance_type:{
        type: DataType.ENUM('debit', 'credit'),
        allowNull: false
    },
    balance:{
        type: DataType.DECIMAL(15,2),
        allowNull: false,
        defaultValue: 0
    },
    description:{
        type: DataType.TEXT,
    },
    is_active:{
        type: DataType.BOOLEAN,
        defaultValue: true
    },
    created_at:{
        type: DataType.DATE,
        defaultValue: DataType.NOW
    },
    updated_at:{
        type: DataType.DATE,
        defaultValue: DataType.NOW
    }
}, {
    tableName: 'accounts',
    timestamps: false,
    hooks: { // manual setting of created_at and updated_at
        beforeCreate: (account) => {
            account.created_at = new Date();
            account.updated_at = new Date();
        },
        beforeUpdate: (account) => {
            account.updated_at = new Date();
        }
    }
})
//underscored: true is often preferred when working with PostgreSQL because snake_case is the conventional naming style for PostgreSQL columns, making your database more consistent with standard PostgreSQL practices
//it's doing manually what Sequelize can do automatically with timestamps: true, underscored: true, which would achieve essentially the same result with less code

//sequelize.sync({force: true}) // use this to create the table in the database, but be careful as it will drop the table if it already exists
/*
  // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: false,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'updateTimestamp',
*/

export default Account