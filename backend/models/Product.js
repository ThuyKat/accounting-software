import { DataTypes } from "sequelize"
import sequelize from "../dbConfig.js"
import Account from "./Account.js"

const Product = sequelize.define('Product', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
    },
    sales_price:{
        type: DataTypes.DECIMAL(15,2),
        allowNull: false,
        defaultValue: 0
    },
    purchase_price:{
        type: DataTypes.DECIMAL(15,2),
        allowNull: false,
        defaultValue: 0
    },
    quantity_on_hand:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tax_code:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    sales_account_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'id'
        }
    },
    purchase_account_id:{
        type: DataTypes.INTEGER,
        references: {
            model: Account,
            key: 'id'
        }
    },
    is_active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'products',
    timestamps: false,
    hooks: { // manual setting of created_at and updated_at
        beforeCreate: (product) => {
            product.created_at = new Date();
            product.updated_at = new Date();
        },
        beforeUpdate: (product) => {
            product.updated_at = new Date();
        }
    }
})
// Associations
Product.belongsTo(Account, {
    foreignKey: 'sales_account_id',
    as: 'sales_revenue_account'
})
Product.belongsTo(Account, {
    foreignKey: 'purchase_account_id',
    as: 'cogs_account'
})
Product.belongsTo(Account,{
    foreignKey: 'inventory_account_id',
    as: 'inventory_account'
})

export default Product
