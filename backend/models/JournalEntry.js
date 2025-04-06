import { DataTypes } from "sequelize"
import { sequelize } from "../db.js"
import { Account } from "./Account.js"

const JournalEntry = sequelize.define('JournalEntry', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    entry_date:{
        type: DataTypes.DATE, // Timestamp with timezone
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
    },
    reference_number:{
        type: DataTypes.STRING,
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
    tableName: 'journal_entries',
    timestamps: false,
    hooks: { // manual setting of created_at and updated_at
        beforeCreate: (journalEntry) => {
            journalEntry.created_at = new Date();
            journalEntry.updated_at = new Date();
        },
        beforeUpdate: (journalEntry) => {
            journalEntry.updated_at = new Date();
        }
    }
})



