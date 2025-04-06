import { DataTypes } from "sequelize"
import { sequelize } from "../db.js"
import { JournalEntry } from "./JournalEntry.js"
import { Account } from "./Account.js"

const JournalLine = sequelize.define('JournalLine', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    debit_amount:{
        type: DataTypes.DECIMAL(15,2),
        defaultValue: 0
    },
    credit_amount:{
        type: DataTypes.DECIMAL(15,2),
        defaultValue: 0
    },
    description:{
        type: DataTypes.TEXT,
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
    tableName: 'journal_lines',
    timestamps: false,
    hooks: { // manual setting of created_at and updated_at
        beforeCreate: (journalLine) => {
            journalLine.created_at = new Date();
            journalLine.updated_at = new Date();
        },
        beforeUpdate: (journalLine) => {
            journalLine.updated_at = new Date();
        }
    }
})
// Associations
JournalLine.belongsTo(JournalEntry, {
    foreignKey: 'journal_entry_id',
    as: 'journal_entry'
})
JournalLine.belongsTo(Account, {
    foreignKey: 'account_id',
    as: 'account'
})
JournalEntry.hasMany(JournalLine)
Account.hasMany(JournalLine)

export default JournalLine
